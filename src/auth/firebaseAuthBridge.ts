import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut as firebaseSignOut,
  type Auth,
  type User,
} from "firebase/auth";

export type SovereignPersistenceMode =
  | "pending"
  | "indexeddb"
  | "localstorage"
  | "unavailable";

export interface SovereignAuthUser {
  readonly uid: string;
  readonly email: string | null;
  readonly displayName: string | null;
  readonly photoURL: string | null;
  readonly emailVerified: boolean;
  readonly providerIds: readonly string[];
}

export interface MappedAuthError {
  readonly code: string;
  readonly message: string;
  readonly silent: boolean;
}

export interface SovereignAuthResult {
  readonly user: SovereignAuthUser;
}

interface PublicFirebaseAuthConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
}

declare const __FIREBASE_AUTH_CONFIG__: PublicFirebaseAuthConfig;

export interface SovereignAuthFacade {
  readonly initialized: boolean;
  readonly auth: Auth | null;
  readonly ready: Promise<void>;
  readonly persistenceMode: SovereignPersistenceMode;
  getCurrentUser(): SovereignAuthUser | null;
  registerWithEmail(email: string, password: string): Promise<SovereignAuthResult>;
  signInWithEmail(email: string, password: string): Promise<SovereignAuthResult>;
  signInWithGoogle(): Promise<SovereignAuthResult>;
  sendPasswordReset(email: string): Promise<void>;
  onAuthStateChanged(callback: (user: SovereignAuthUser | null) => void): () => void;
  signOut(): Promise<void>;
  getIdToken(forceRefresh?: boolean): Promise<string | null>;
  mapAuthError(error: unknown, lang?: string): MappedAuthError;
}

declare global {
  interface Window {
    SovereignAuth?: SovereignAuthFacade;
    currentLang?: string;
  }
}

function resolveLang(lang?: string): "ar" | "en" {
  if (lang === "ar" || lang === "en") return lang;
  if (typeof window !== "undefined" && window.currentLang === "ar") return "ar";
  if (typeof document !== "undefined" && document.documentElement?.lang === "ar") return "ar";
  return "en";
}

function extractErrorCode(error: unknown): string {
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string" && code.length > 0) return code;
  }
  return "auth/unknown";
}

function mapAuthError(error: unknown, lang?: string): MappedAuthError {
  const code = extractErrorCode(error);
  const isAr = resolveLang(lang) === "ar";

  switch (code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return Object.freeze({
        code,
        silent: true,
        message: "",
      });
    case "auth/popup-blocked":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "تم حظر نافذة تسجيل الدخول المنبثقة. يرجى السماح بالنوافذ المنبثقة لهذا الموقع أو استخدام البريد الإلكتروني وكلمة المرور."
          : "Sign-in popup was blocked by your browser. Please allow popups for this site or sign in with email and password.",
      });
    case "auth/unauthorized-domain":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "هذا النطاق غير مصرح له بتسجيل الدخول عبر Google. يرجى إضافته إلى النطاقات المصرح بها في إعدادات المصادقة."
          : "This domain is not authorized for Google Sign-In. Add this host under Firebase Authentication Authorized Domains.",
      });
    case "auth/account-exists-with-different-credential":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "يوجد حساب مرتبط بهذا البريد الإلكتروني بطريقة دخول مختلفة. يرجى تسجيل الدخول بالطريقة السابقة."
          : "An account already exists with this email using a different sign-in method.",
      });
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-login-credentials":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "بيانات الدخول غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور."
          : "Invalid credentials. Please verify your email and password.",
      });
    case "auth/invalid-email":
    case "auth/missing-email":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "يرجى إدخال عنوان بريد إلكتروني صحيح."
          : "Please enter a valid email address.",
      });
    case "auth/missing-password":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "يرجى إدخال كلمة المرور."
          : "Please enter your password.",
      });
    case "auth/email-already-in-use":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول بدلاً من ذلك."
          : "This email address is already registered. Please sign in instead.",
      });
    case "auth/weak-password":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "كلمة المرور ضعيفة جداً. يجب أن تتكون من 6 أحرف على الأقل."
          : "Password is too weak. Please use at least 6 characters.",
      });
    case "auth/too-many-requests":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "محاولات كثيرة جداً. يرجى الانتظار قليلاً ثم المحاولة مجدداً."
          : "Too many attempts. Please wait a moment and try again.",
      });
    case "auth/network-request-failed":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "تعذر الاتصال بالشبكة. يرجى التحقق من اتصالك والمحاولة مجدداً."
          : "Network connection error. Please check your connection and try again.",
      });
    case "auth/operation-not-allowed":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "طريقة تسجيل الدخول هذه غير مفعّلة حالياً في إعدادات النادي."
          : "This sign-in method is not currently enabled in authentication settings.",
      });
    case "auth/persistence-unavailable":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "التخزين الآمن للجلسة غير متاح في هذا المتصفح. يرجى تفعيل تخزين المتصفح أو إعادة المحاولة في بيئة متصفح مدعومة."
          : "Secure session storage is unavailable in this browser. Please enable browser storage or retry in a supported browser environment.",
      });
    case "auth/not-initialized":
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "خدمة المصادقة غير متاحة حالياً. يرجى المحاولة لاحقاً."
          : "Authentication service is currently unavailable. Please try again later.",
      });
    default:
      return Object.freeze({
        code,
        silent: false,
        message: isAr
          ? "تعذر إتمام المصادقة. يرجى المحاولة مرة أخرى."
          : "Unable to complete authentication. Please try again.",
      });
  }
}

function createCodedError(code: string): Error & { code: string } {
  const err = new Error(code) as Error & { code: string };
  err.code = code;
  return err;
}

function toSanitizedUser(user: User | null): SovereignAuthUser | null {
  if (!user) return null;
  const providerIds = Object.freeze(
    Array.isArray(user.providerData)
      ? user.providerData
          .map((p) => (p && typeof p.providerId === "string" ? p.providerId : ""))
          .filter(Boolean)
      : []
  );
  return Object.freeze({
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    photoURL: user.photoURL ?? null,
    emailVerified: Boolean(user.emailVerified),
    providerIds,
  });
}

function createSovereignAuth(): SovereignAuthFacade {
  let app: FirebaseApp | null = null;
  let auth: Auth | null = null;
  let initialized = false;
  let googleSignInInFlight = false;
  let persistenceMode: SovereignPersistenceMode = "pending";

  const cfg =
    typeof __FIREBASE_AUTH_CONFIG__ !== "undefined" ? __FIREBASE_AUTH_CONFIG__ : null;

  if (cfg && cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId) {
    try {
      const publicConfig: PublicFirebaseAuthConfig = {
        apiKey: cfg.apiKey,
        authDomain: cfg.authDomain,
        projectId: cfg.projectId,
        appId: cfg.appId,
      };
      app = getApps().length > 0 ? getApp() : initializeApp(publicConfig);
      auth = getAuth(app);
      initialized = true;
    } catch {
      initialized = false;
      auth = null;
    }
  }

  function isIndexedDBAvailable(): Promise<boolean> {
    return new Promise((resolve) => {
      let settled = false;
      const finish = (ok: boolean) => {
        if (!settled) {
          settled = true;
          resolve(ok);
        }
      };

      let idb: IDBFactory | undefined;
      try {
        if (typeof window === "undefined") {
          finish(false);
          return;
        }
        idb = window.indexedDB;
      } catch {
        finish(false);
        return;
      }

      if (!idb || typeof idb.open !== "function") {
        finish(false);
        return;
      }

      const probeName = "__sovereign_auth_idb_probe__";
      const timer = setTimeout(() => finish(false), 1500);

      try {
        const request = idb.open(probeName, 1);
        request.onerror = () => {
          clearTimeout(timer);
          finish(false);
        };
        request.onblocked = () => {
          clearTimeout(timer);
          finish(false);
        };
        request.onsuccess = () => {
          clearTimeout(timer);
          try {
            request.result.close();
          } catch {
            // Ignore close errors during probe cleanup.
          }
          try {
            idb?.deleteDatabase(probeName);
          } catch {
            // Ignore delete errors during probe cleanup.
          }
          finish(true);
        };
      } catch {
        clearTimeout(timer);
        finish(false);
      }
    });
  }

  function isLocalStorageAvailable(): boolean {
    try {
      if (typeof window === "undefined") return false;
      const storage = window.localStorage;
      if (!storage) return false;
      const probeKey = "__sovereign_auth_ls_probe__";
      storage.setItem(probeKey, "1");
      const readBack = storage.getItem(probeKey);
      storage.removeItem(probeKey);
      return readBack === "1";
    } catch {
      return false;
    }
  }

  async function initializePersistence(activeAuth: Auth): Promise<void> {
    if (await isIndexedDBAvailable()) {
      try {
        await setPersistence(activeAuth, indexedDBLocalPersistence);
        persistenceMode = "indexeddb";
        return;
      } catch {
        // IndexedDB persistence configuration failed; attempt browser localStorage fallback.
      }
    }

    if (isLocalStorageAvailable()) {
      try {
        await setPersistence(activeAuth, browserLocalPersistence);
        persistenceMode = "localstorage";
        return;
      } catch {
        // Browser localStorage persistence configuration failed.
      }
    }

    persistenceMode = "unavailable";
    throw createCodedError("auth/persistence-unavailable");
  }

  const ready: Promise<void> = (() => {
    if (!initialized || !auth) {
      persistenceMode = "unavailable";
      return Promise.reject(createCodedError("auth/not-initialized"));
    }
    return initializePersistence(auth);
  })();

  // Attach an internal rejection observer so unhandledrejection never fires while preserving `ready`'s rejected state.
  ready.catch(() => undefined);

  async function requireAuth(): Promise<Auth> {
    if (!initialized || !auth) {
      throw createCodedError("auth/not-initialized");
    }
    await ready;
    if (persistenceMode !== "indexeddb" && persistenceMode !== "localstorage") {
      throw createCodedError("auth/persistence-unavailable");
    }
    return auth;
  }

  const facade: SovereignAuthFacade = {
    get initialized() {
      return initialized;
    },
    get auth() {
      return auth;
    },
    ready,
    get persistenceMode(): SovereignPersistenceMode {
      return persistenceMode;
    },
    getCurrentUser(): SovereignAuthUser | null {
      if (persistenceMode === "unavailable") {
        return null;
      }
      return toSanitizedUser(auth ? auth.currentUser : null);
    },
    async registerWithEmail(email: string, password: string): Promise<SovereignAuthResult> {
      const cleanEmail = typeof email === "string" ? email.trim() : "";
      const rawPassword = typeof password === "string" ? password : "";
      if (!cleanEmail) throw createCodedError("auth/missing-email");
      if (!rawPassword) throw createCodedError("auth/missing-password");
      const activeAuth = await requireAuth();
      const credential = await createUserWithEmailAndPassword(activeAuth, cleanEmail, rawPassword);
      const sanitized = toSanitizedUser(credential.user);
      if (!sanitized) throw createCodedError("auth/unknown");
      return { user: sanitized };
    },
    async signInWithEmail(email: string, password: string): Promise<SovereignAuthResult> {
      const cleanEmail = typeof email === "string" ? email.trim() : "";
      const rawPassword = typeof password === "string" ? password : "";
      if (!cleanEmail) throw createCodedError("auth/missing-email");
      if (!rawPassword) throw createCodedError("auth/missing-password");
      const activeAuth = await requireAuth();
      const credential = await signInWithEmailAndPassword(activeAuth, cleanEmail, rawPassword);
      const sanitized = toSanitizedUser(credential.user);
      if (!sanitized) throw createCodedError("auth/unknown");
      return { user: sanitized };
    },
    async signInWithGoogle(): Promise<SovereignAuthResult> {
      if (googleSignInInFlight) {
        throw createCodedError("auth/cancelled-popup-request");
      }
      googleSignInInFlight = true;
      try {
        const activeAuth = await requireAuth();
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        const credential = await signInWithPopup(activeAuth, provider);
        const sanitized = toSanitizedUser(credential.user);
        if (!sanitized) throw createCodedError("auth/unknown");
        return { user: sanitized };
      } finally {
        googleSignInInFlight = false;
      }
    },
    async sendPasswordReset(email: string): Promise<void> {
      const cleanEmail = typeof email === "string" ? email.trim() : "";
      if (!cleanEmail) throw createCodedError("auth/missing-email");
      const activeAuth = await requireAuth();
      try {
        await sendPasswordResetEmail(activeAuth, cleanEmail);
      } catch (err) {
        if (extractErrorCode(err) === "auth/user-not-found") {
          return;
        }
        throw err;
      }
    },
    onAuthStateChanged(callback: (user: SovereignAuthUser | null) => void): () => void {
      if (typeof callback !== "function") {
        return () => undefined;
      }
      if (!initialized || !auth) {
        let cancelled = false;
        Promise.resolve().then(() => {
          if (!cancelled) callback(null);
        });
        return () => {
          cancelled = true;
        };
      }
      const activeAuth = auth;
      let disposed = false;
      let innerUnsubscribe: (() => void) | null = null;
      ready.then(
        () => {
          if (disposed) return;
          innerUnsubscribe = firebaseOnAuthStateChanged(activeAuth, (firebaseUser) => {
            if (!disposed) {
              callback(toSanitizedUser(firebaseUser));
            }
          });
        },
        () => {
          // Persistence unavailable: do not subscribe to Firebase Auth or silently establish a session.
          if (disposed) return;
          callback(null);
        }
      );
      return () => {
        disposed = true;
        if (innerUnsubscribe) {
          innerUnsubscribe();
          innerUnsubscribe = null;
        }
      };
    },
    async signOut(): Promise<void> {
      const activeAuth = await requireAuth();
      await firebaseSignOut(activeAuth);
    },
    async getIdToken(forceRefresh = false): Promise<string | null> {
      const activeAuth = await requireAuth();
      if (!activeAuth.currentUser) return null;
      return activeAuth.currentUser.getIdToken(Boolean(forceRefresh));
    },
    mapAuthError,
  };

  if (typeof window !== "undefined") {
    window.SovereignAuth = facade;
  }

  return facade;
}

const SovereignAuth = createSovereignAuth();

export default SovereignAuth;
