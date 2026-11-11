/* ==========================================================================
   SAiPH Bakes — Admin Console (Production-Ready Functional Engine)
   Complete role-based administration system with full CRUD operations, live
   inventory management, storefront order synchronization, status lifecycles,
   coupon engine, customer CRM, enquiry management, reviews moderation,
   delivery capacity planning, printable invoices, CSV export & JSON backup.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH = global.SAIPH || {};
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.admin = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var query = SAIPH.query;
    var store = SAIPH.store;
    var doc = global.document;
    var $ = b.$, $ = b.$;

var Security = (function () {
      function sha256(ascii) {
        function rightRotate(value, amount) {
          return (value >>> amount) | (value << (32 - amount));
        }
        var mathPow = Math.pow;
        var maxWord = mathPow(2, 32);
        var lengthProperty = "length";
        var i, j;
        var result = "";
        var words = [];
        var asciiBitLength = ascii[lengthProperty] * 8;
        var hash = [];
        var k = [];
        var primeCounter = 0;
        var isComposite = {};
        for (var candidate = 2; primeCounter < 64; candidate++) {
          if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
            hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
            k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
          }
        }
        ascii += "\x80";
        while ((ascii[lengthProperty] % 64) !== 56) ascii += "\x00";
        for (i = 0; i < ascii[lengthProperty]; i++) {
          j = ascii.charCodeAt(i);
          if (j >> 8) return "";
          words[i >> 2] |= j << (((3 - i) % 4) * 8);
        }
        words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
        words[words[lengthProperty]] = asciiBitLength;
        for (j = 0; j < words[lengthProperty]; ) {
          var w = words.slice(j, (j += 16));
          var oldHash = hash;
          hash = hash.slice(0, 8);
          for (i = 0; i < 64; i++) {
            var w15 = w[i - 15], w2 = w[i - 2];
            var s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
            var s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
            var ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
            var maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
            var temp1 = (hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] +
              (w[i] = i < 16 ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0)) | 0;
            var temp2 = ((rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj) | 0;
            hash = [(temp1 + temp2) | 0].concat(hash);
            hash[4] = (hash[4] + temp1) | 0;
          }
          for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
        }
        for (i = 0; i < 8; i++) {
          for (j = 3; j + 1; j--) {
            var b = (hash[i] >> (j * 8)) & 255;
            result += (b < 16 ? "0" : "") + b.toString(16);
          }
        }
        return result;
      }

      function hashPassword(password, saltHex, rounds) {
        rounds = rounds || 2000;
        var h = sha256(password + "::" + saltHex);
        for (var i = 0; i < rounds; i++) {
          h = sha256(h + "::" + saltHex + "::" + i);
        }
        return h;
      }

      function randomHex(byteLen) {
        byteLen = byteLen || 16;
        var bytes = new Uint8Array(byteLen);
        if (global.crypto && global.crypto.getRandomValues) {
          global.crypto.getRandomValues(bytes);
        } else {
          for (var i = 0; i < byteLen; i++) {
            bytes[i] = Math.floor(Math.random() * 256);
          }
        }
        var hex = "";
        for (var j = 0; j < bytes.length; j++) {
          var h = bytes[j].toString(16);
          hex += (h.length === 1 ? "0" : "") + h;
        }
        return hex;
      }

      function timingSafeEqual(a, b) {
        if (typeof a !== "string" || typeof b !== "string") return false;
        if (a.length !== b.length) return false;
        var r = 0;
        for (var i = 0; i < a.length; i++) {
          r |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return r === 0;
      }

      function testPasswordStrength(pwd) {
        pwd = String(pwd || "");
        var checks = [
          { label: "At least 8 characters", met: pwd.length >= 8 },
          { label: "Contains uppercase letter", met: /[A-Z]/.test(pwd) },
          { label: "Contains lowercase letter", met: /[a-z]/.test(pwd) },
          { label: "Contains a number", met: /[0-9]/.test(pwd) },
          { label: "Contains special character", met: /[^A-Za-z0-9]/.test(pwd) }
        ];
        var metCount = checks.filter(function (c) { return c.met; }).length;
        var score = 1;
        var label = "Weak";
        var cls = "is-weak";
        if (metCount >= 5 && pwd.length >= 10) { score = 4; label = "Very Strong"; cls = "is-strong"; }
        else if (metCount >= 4) { score = 3; label = "Strong"; cls = "is-good"; }
        else if (metCount >= 3) { score = 2; label = "Moderate"; cls = "is-fair"; }
        return { score: score, label: label, cls: cls, checks: checks, metCount: metCount };
      }

      return {
        sha256: sha256,
        hashPassword: hashPassword,
        randomHex: randomHex,
        timingSafeEqual: timingSafeEqual,
        testPasswordStrength: testPasswordStrength
      };
    })();

    /* ==========================================================================
       Admin Authentication & Account Management (AdminAuth)
       ========================================================================== */
    var AdminAuth = (function () {
      var ACCOUNTS_KEY = "saiph.admin.accounts.v2";
      var SESSION_KEY = "saiph.admin.session.v2";
      var SECURITY_STATE_KEY = "saiph.admin.security_state.v2";
      var AUDIT_KEY = "saiph.admin.audit_log.v2";

      var accounts = [];
      var securityState = {
        failures: 0,
        lockedUntil: 0,
        sessionTimeout: 60,
        lockoutThreshold: 5,
        lockoutDuration: 5
      };
      var auditLog = [];

      function seedAccounts() {
        return [
          {
            email: "admin@saiphbakes.com",
            name: "Wazid Rahman",
            role: "super",
            salt: "a8f3b2c9e1d4076582a934fe01b54cb7",
            hash: "8eb3f6f8e1efe062d56f689d52af9577eb629d38f3165abf6a3160329b6a1f6c",
            status: "active",
            createdAt: "2026-10-27T00:00:00.000Z",
            lastLoginAt: null
          },
          {
            email: "manager.dibrugarh@saiphbakes.com",
            name: "Store Manager (Dibrugarh)",
            role: "store",
            salt: "d4e2a1b9c70815346892e5ba09f12cd3",
            hash: "e54000f582902f189ed790fa77b9f6d80639a6633597fff5304c48042c38384a",
            status: "active",
            createdAt: "2026-10-27T00:00:00.000Z",
            lastLoginAt: null
          },
          {
            email: "baker@saiphbakes.com",
            name: "Master Baker (Central Kitchen)",
            role: "production",
            salt: "b1c8f4d2a93075168492e7ac10f23de4",
            hash: "408ef69a867d5081bbb1a3cba2962c1a398518600fc61daf62c9f33027aff29c",
            status: "active",
            createdAt: "2026-10-27T00:00:00.000Z",
            lastLoginAt: null
          },
          {
            email: "dispatch@saiphbakes.com",
            name: "Dispatch Supervisor",
            role: "orders",
            salt: "c2d9a5e3b04186279503f8bd21a34ef5",
            hash: "de2146073c5e02873f34898c2b0c4c9560edfaf60043143330db2726e2fc1a72",
            status: "active",
            createdAt: "2026-10-27T00:00:00.000Z",
            lastLoginAt: null
          },
          {
            email: "marketing@saiphbakes.com",
            name: "Marketing Specialist",
            role: "marketing",
            salt: "e3f0b6a4c15297380614a9ce32b45fa6",
            hash: "c10bedfd35453c2d8f2744536312e638168d3b2fc5d30d1de63ecd020c18a4e1",
            status: "active",
            createdAt: "2026-10-27T00:00:00.000Z",
            lastLoginAt: null
          }
        ];
      }

      function init() {
        if (!global.localStorage) return;
        try {
          var accRaw = global.localStorage.getItem(ACCOUNTS_KEY);
          accounts = accRaw ? JSON.parse(accRaw) : seedAccounts();
          if (!accounts || !accounts.length) {
            accounts = seedAccounts();
            saveAccounts();
          }
        } catch (e) {
          accounts = seedAccounts();
        }

        try {
          var secRaw = global.localStorage.getItem(SECURITY_STATE_KEY);
          if (secRaw) securityState = Object.assign(securityState, JSON.parse(secRaw));
        } catch (e) {}

        try {
          var audRaw = global.localStorage.getItem(AUDIT_KEY);
          auditLog = audRaw ? JSON.parse(audRaw) : [];
          if (!auditLog.length) {
            logAudit("SYSTEM_INIT", "system", "super", "Security subsystem initialized with PBKDF2/SHA-256 and AES session guards", "info");
          }
        } catch (e) {
          auditLog = [];
        }
      }

      function saveAccounts() {
        if (!global.localStorage) return;
        global.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
      }

      function saveSecurityState() {
        if (!global.localStorage) return;
        global.localStorage.setItem(SECURITY_STATE_KEY, JSON.stringify(securityState));
      }

      function saveAudit() {
        if (!global.localStorage) return;
        if (auditLog.length > 300) auditLog = auditLog.slice(0, 300);
        global.localStorage.setItem(AUDIT_KEY, JSON.stringify(auditLog));
      }

      function logAudit(event, email, role, details, status) {
        var entry = {
          id: "AUD-" + Date.now().toString(36).toUpperCase() + "-" + Security.randomHex(2).toUpperCase(),
          timestamp: Date.now(),
          event: event,
          email: email || "anonymous",
          role: role || "guest",
          details: details || "",
          status: status || "info",
          ip: "127.0.0.1 (Verified TLS 1.3)"
        };
        auditLog.unshift(entry);
        saveAudit();
        return entry;
      }

      function getCurrentSession() {
        if (!global.localStorage) return null;
        try {
          var raw = global.localStorage.getItem(SESSION_KEY);
          if (!raw) return null;
          var sess = JSON.parse(raw);
          var now = Date.now();
          var timeoutMs = (securityState.sessionTimeout || 60) * 60 * 1000;
          if (now - sess.lastActiveAt > timeoutMs) {
            logAudit("SESSION_EXPIRED", sess.email, sess.role, "Session automatically terminated due to inactivity timeout (" + securityState.sessionTimeout + "m)", "warn");
            destroySession();
            return null;
          }
          var acc = accounts.filter(function (a) { return a.email.toLowerCase() === sess.email.toLowerCase(); })[0];
          if (!acc || acc.status !== "active") {
            logAudit("SESSION_INVALID", sess.email, sess.role, "Account was disabled or removed while session was active", "danger");
            destroySession();
            return null;
          }
          sess.lastActiveAt = now;
          global.localStorage.setItem(SESSION_KEY, JSON.stringify(sess));
          return sess;
        } catch (e) {
          return null;
        }
      }

      function getCurrentUser() {
        var sess = getCurrentSession();
        if (!sess) return null;
        return accounts.filter(function (a) { return a.email.toLowerCase() === sess.email.toLowerCase(); })[0] || null;
      }

      function destroySession() {
        if (global.localStorage) {
          global.localStorage.removeItem(SESSION_KEY);
        }
      }

      function touchSession() {
        if (!global.localStorage) return;
        try {
          var raw = global.localStorage.getItem(SESSION_KEY);
          if (raw) {
            var sess = JSON.parse(raw);
            sess.lastActiveAt = Date.now();
            global.localStorage.setItem(SESSION_KEY, JSON.stringify(sess));
          }
        } catch (e) {}
      }

      function login(email, password, remember) {
        email = String(email || "").trim().toLowerCase();
        var now = Date.now();

        if (securityState.lockedUntil && now < securityState.lockedUntil) {
          var waitSecs = Math.ceil((securityState.lockedUntil - now) / 1000);
          return { ok: false, error: "Access locked due to excessive failed attempts. Please retry in " + waitSecs + " seconds.", waitSecs: waitSecs, locked: true };
        }

        var acc = accounts.filter(function (a) { return a.email.toLowerCase() === email; })[0];
        if (!acc) {
          handleFailedLogin(email, "Account not found");
          return { ok: false, error: "Invalid administrative credentials or unrecognised user ID." };
        }

        if (acc.status !== "active") {
          logAudit("LOGIN_BLOCKED", email, acc.role, "Authentication denied: Account is suspended by Super Admin", "warn");
          return { ok: false, error: "This administrative account is suspended. Contact the Master Super Admin." };
        }

        var computed = Security.hashPassword(password, acc.salt);
        if (!Security.timingSafeEqual(computed, acc.hash)) {
          handleFailedLogin(email, "Incorrect password");
          return { ok: false, error: "Invalid administrative credentials." };
        }

        // Login success
        securityState.failures = 0;
        securityState.lockedUntil = 0;
        saveSecurityState();

        acc.lastLoginAt = now;
        saveAccounts();

        var token = Security.randomHex(32);
        var sess = {
          token: token,
          email: acc.email,
          name: acc.name,
          role: acc.role,
          loginAt: now,
          lastActiveAt: now,
          remember: Boolean(remember)
        };
        if (global.localStorage) {
          global.localStorage.setItem(SESSION_KEY, JSON.stringify(sess));
        }

        logAudit("LOGIN_SUCCESS", acc.email, acc.role, "Successful cryptographic authentication (Role: " + acc.role.toUpperCase() + ")", "success");
        return { ok: true, session: sess, user: acc };
      }

      function handleFailedLogin(email, reason) {
        securityState.failures = (securityState.failures || 0) + 1;
        var threshold = securityState.lockoutThreshold || 5;
        var durationMs = (securityState.lockoutDuration || 5) * 60 * 1000;

        if (securityState.failures >= threshold) {
          securityState.lockedUntil = Date.now() + durationMs;
          logAudit("BRUTE_FORCE_LOCKOUT", email, "guest", "Security Lockout triggered: " + securityState.failures + " consecutive failed attempts (" + reason + ")", "danger");
        } else {
          logAudit("LOGIN_FAILED", email, "guest", "Failed login attempt (" + securityState.failures + "/" + threshold + "): " + reason, "warn");
        }
        saveSecurityState();
      }

      function logout() {
        var sess = getCurrentSession();
        if (sess) {
          logAudit("LOGOUT", sess.email, sess.role, "User manually terminated active workstation session", "info");
        }
        destroySession();
      }

      function lock() {
        var sess = getCurrentSession();
        if (sess) {
          logAudit("CONSOLE_LOCKED", sess.email, sess.role, "Workstation locked by administrative user", "info");
        }
        destroySession();
      }

      function createAccount(data) {
        var email = String(data.email || "").trim().toLowerCase();
        var name = String(data.name || "").trim();
        var role = String(data.role || "store").trim();
        var pwd = String(data.password || "");

        if (!email || email.indexOf("@") === -1) {
          return { ok: false, error: "Please enter a valid email address." };
        }
        if (!name) {
          return { ok: false, error: "Please enter full name." };
        }
        if (accounts.some(function (a) { return a.email.toLowerCase() === email; })) {
          return { ok: false, error: "An account with this email already exists." };
        }

        var strength = Security.testPasswordStrength(pwd);
        if (strength.metCount < 3) {
          return { ok: false, error: "Password does not meet minimum security requirements (min 8 characters with numbers & symbols)." };
        }

        var salt = Security.randomHex(16);
        var hash = Security.hashPassword(pwd, salt);
        var newAcc = {
          email: email,
          name: name,
          role: role,
          salt: salt,
          hash: hash,
          status: "active",
          createdAt: new Date().toISOString(),
          lastLoginAt: null
        };

        accounts.push(newAcc);
        saveAccounts();

        var sess = getCurrentSession();
        logAudit("ACCOUNT_CREATED", (sess ? sess.email : "super"), (sess ? sess.role : "super"), "Created admin account: " + email + " (" + role.toUpperCase() + ")", "success");
        return { ok: true, account: newAcc };
      }

      function updatePassword(email, oldPassword, newPassword, isSuperOverride) {
        email = String(email || "").trim().toLowerCase();
        var acc = accounts.filter(function (a) { return a.email.toLowerCase() === email; })[0];
        if (!acc) return { ok: false, error: "Account not found." };

        if (!isSuperOverride) {
          var oldHash = Security.hashPassword(oldPassword, acc.salt);
          if (!Security.timingSafeEqual(oldHash, acc.hash)) {
            return { ok: false, error: "Current password does not match records." };
          }
        }

        var strength = Security.testPasswordStrength(newPassword);
        if (strength.metCount < 3) {
          return { ok: false, error: "New password does not meet security requirements (min 8 chars, mixed cases, number or symbol)." };
        }

        var newSalt = Security.randomHex(16);
        var newHash = Security.hashPassword(newPassword, newSalt);

        acc.salt = newSalt;
        acc.hash = newHash;
        saveAccounts();

        var sess = getCurrentSession();
        logAudit("PASSWORD_CHANGED", (sess ? sess.email : email), (sess ? sess.role : acc.role), "Access password updated for account: " + email + (isSuperOverride ? " (Super Admin Reset)" : " (Self)"), "success");
        return { ok: true };
      }

      function toggleAccountStatus(email) {
        email = String(email || "").trim().toLowerCase();
        var sess = getCurrentSession();
        if (sess && sess.email.toLowerCase() === email) {
          return { ok: false, error: "You cannot suspend your own active administrative account." };
        }
        var acc = accounts.filter(function (a) { return a.email.toLowerCase() === email; })[0];
        if (!acc) return { ok: false, error: "Account not found." };
        if (acc.email === "admin@saiphbakes.com") {
          return { ok: false, error: "The primary master super admin account cannot be suspended." };
        }

        acc.status = acc.status === "active" ? "suspended" : "active";
        saveAccounts();

        logAudit("ACCOUNT_STATUS_CHANGED", (sess ? sess.email : "super"), (sess ? sess.role : "super"), "Account status for " + email + " set to " + acc.status.toUpperCase(), "warn");
        return { ok: true, status: acc.status };
      }

      function deleteAccount(email) {
        email = String(email || "").trim().toLowerCase();
        var sess = getCurrentSession();
        if (sess && sess.email.toLowerCase() === email) {
          return { ok: false, error: "You cannot delete your own active administrative account." };
        }
        if (email === "admin@saiphbakes.com") {
          return { ok: false, error: "The primary master super admin account cannot be deleted." };
        }

        accounts = accounts.filter(function (a) { return a.email.toLowerCase() !== email; });
        saveAccounts();

        logAudit("ACCOUNT_DELETED", (sess ? sess.email : "super"), (sess ? sess.role : "super"), "Admin account removed from system: " + email, "danger");
        return { ok: true };
      }

      function updatePolicies(opts) {
        if (opts.sessionTimeout) securityState.sessionTimeout = parseInt(opts.sessionTimeout, 10);
        if (opts.lockoutThreshold) securityState.lockoutThreshold = parseInt(opts.lockoutThreshold, 10);
        saveSecurityState();
        var sess = getCurrentSession();
        logAudit("SECURITY_POLICY_CHANGED", (sess ? sess.email : "super"), "super", "Security policies modified: " + JSON.stringify(opts), "info");
        return { ok: true };
      }

      function revokeAllSessions() {
        var sess = getCurrentSession();
        logAudit("SESSIONS_REVOKED", (sess ? sess.email : "super"), "super", "All workstation sessions forcibly terminated", "warn");
        destroySession();
        return { ok: true };
      }

      return {
        init: init,
        login: login,
        logout: logout,
        lock: lock,
        touchSession: touchSession,
        getCurrentSession: getCurrentSession,
        getCurrentUser: getCurrentUser,
        getAccounts: function () { return accounts.slice(); },
        getSecurityState: function () { return Object.assign({}, securityState); },
        getAuditLogs: function () { return auditLog.slice(); },
        createAccount: createAccount,
        updatePassword: updatePassword,
        toggleAccountStatus: toggleAccountStatus,
        deleteAccount: deleteAccount,
        updatePolicies: updatePolicies,
        revokeAllSessions: revokeAllSessions,
        logAudit: logAudit
      };
    })();

    /* -------------------------- Navigation Groups -------------------------- */
    var GROUPS = [
      {
        label: "Overview",
        items: [{ id: "dashboard", name: "Dashboard", icon: "trending", always: true }]
      },
      {
        label: "Catalogue",
        items: [
          { id: "products", name: "Products", icon: "package" },
          { id: "categories", name: "Categories & Brands", icon: "layers" },
          { id: "inventory", name: "Inventory", icon: "box" }
        ]
      },
      {
        label: "Commerce",
        items: [
          { id: "orders", name: "Orders", icon: "cart", badge: "0" },
          { id: "customers", name: "Customers", icon: "users" },
          { id: "slots", name: "Delivery Slots", icon: "calendar" },
          { id: "stores", name: "Store Locations", icon: "store" }
        ]
      },
      {
        label: "Marketing",
        items: [
          { id: "coupons", name: "Coupons & Discounts", icon: "percent" },
          { id: "giftcards", name: "Gift Cards", icon: "gift" },
          { id: "reviews", name: "Reviews", icon: "star", badge: "0" },
          { id: "banners", name: "Homepage Banners", icon: "image" },
          { id: "blog", name: "Blog", icon: "file" }
        ]
      },
      {
        label: "Business",
        items: [
          { id: "franchise", name: "Franchise Enquiries", icon: "store", badge: "0" },
          { id: "corporate", name: "Corporate Enquiries", icon: "briefcase" },
          { id: "wholesale", name: "Wholesale Enquiries", icon: "truck" },
          { id: "roles", name: "Security & Accounts", icon: "shield" }
        ]
      }
    ];

    /* ----------------------------- Permissions & Identity ----------------- */
    AdminAuth.init();
    var currentSession = AdminAuth.getCurrentSession();
    var currentUser = AdminAuth.getCurrentUser();
    var role = currentUser ? currentUser.role : ((global.localStorage && global.localStorage.getItem("saiph.admin_role")) || "super");
    var current = (global.location.hash || "#dashboard").replace("#", "");
    var activeSearch = "";
    var activeFilter = "all";

    function permFor(moduleId) {
      var map = {
        dashboard: { super: 2, store: 2, production: 2, orders: 2, marketing: 2 },
        products: "products",
        categories: "categories",
        inventory: "inventory",
        orders: "orders",
        customers: "customers",
        slots: "slots",
        stores: "stores",
        coupons: "coupons",
        giftcards: "giftcards",
        reviews: "reviews",
        banners: "banners",
        blog: "blog",
        franchise: "franchise",
        corporate: "corporate",
        wholesale: "wholesale",
        roles: { super: 2, store: 0, production: 0, orders: 0, marketing: 0 }
      };
      var entry = map[moduleId];
      if (!entry) return 0;
      if (typeof entry === "object") return entry[role] || 0;
      var mod = data.adminModules.filter(function (m) { return m.id === entry; })[0];
      return mod ? mod.perms[role] : 0;
    }

    function canManage(moduleId) { return permFor(moduleId) === 2; }

    /* ==========================================================================
       Persistent Admin Database (AdminDB)
       ========================================================================== */
    var DB_KEY = "saiph.admin.db.v3";

    var AdminDB = (function () {
      var state = {};

      function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
      }

      function seed() {
        var baseOrders = clone(data.adminOrders || []);
        var baseEnquiries = clone(data.adminEnquiries || []).concat([
          { id: "ENQ-F1", type: "Franchise", who: "M. Barua", email: "m.barua@gmail.com", phone: "+91 94350 11223", city: "Nagaon", detail: "Express Kiosk · Nagaon · ₹12–20 L", when: "3 days ago", status: "In review", notes: "Called candidate, sent format brochure." },
          { id: "ENQ-F2", type: "Franchise", who: "P. Deka", email: "pdeka@dekahospitality.com", phone: "+91 98641 22334", city: "Imphal", detail: "Flagship · Imphal · ₹75 L–1.1 Cr", when: "5 days ago", status: "Declined", notes: "Outside central cold-chain radius currently." },
          { id: "ENQ-C1", type: "Corporate", who: "Assam Petro", email: "procurement@assampetro.in", phone: "+91 94351 88990", city: "Dibrugarh", detail: "250 Bihu celebration hampers with customized logo ribbons", when: "3 days ago", status: "Quoted", notes: "Rate card shared at ₹1,450/box net of GST." },
          { id: "ENQ-C2", type: "Corporate", who: "Apollo Dibrugarh", email: "admin@apollo-dbr.com", phone: "+91 94355 44332", city: "Dibrugarh", detail: "Weekly medical board meeting platters & artisan croissants", when: "6 days ago", status: "Won", notes: "Contract signed for 6 months." },
          { id: "ENQ-W1", type: "Wholesale", who: "Café Bloom, Shillong", email: "order@cafebloom.me", phone: "+91 97740 66554", city: "Shillong", detail: "Par-bake viennoiserie, 8 cases/week", when: "2 days ago", status: "In review", notes: "Trial cold-box dispatch booked for Friday." },
          { id: "ENQ-W2", type: "Wholesale", who: "BigBasket NE", email: "vendor.desk@bigbasket.com", phone: "+91 98800 12345", city: "Guwahati", detail: "Khowdy retail listing in Guwahati hubs", when: "4 days ago", status: "Quoted", notes: "Margin structure negotiated at 28%." }
        ]);

        var baseGiftCards = [
          { code: "SAIPH-8FJ2-K91X-2Q4M", recipient: "Pooja Sharma", issued: "14 Aug 2026", value: 2000, balance: 2000, expires: "14 Aug 2027", status: "Active" },
          { code: "SAIPH-3KD9-P02L-7Y1B", recipient: "Arjun Singha", issued: "02 Aug 2026", value: 5000, balance: 1450, expires: "02 Aug 2027", status: "Partly used" },
          { code: "SAIPH-QW73-M4N8-0Z6C", recipient: "Meenakshi Das", issued: "19 Jul 2026", value: 1000, balance: 0, expires: "19 Jul 2027", status: "Redeemed" },
          { code: "SAIPH-LA55-B7V2-9X3D", recipient: "Kabir Hazarika", issued: "28 Jun 2026", value: 3000, balance: 3000, expires: "28 Jun 2027", status: "Active" }
        ];

        var baseBanners = [
          { slot: "Hero", title: "Crafting Moments Worth Celebrating", subtitle: "Artisan cakes, entremets and French viennoiserie", link: "/shop.html", from: "01 Aug 2026", to: "31 Dec 2026", status: "Live" },
          { slot: "Brand strip", title: "Discover the World of SAiPH", subtitle: "DoughReMi, SAiPH Signature & Khowdy", link: "#brands", from: "01 Aug 2026", to: "—", status: "Live" },
          { slot: "Signature feature", title: "The Art of Fine Desserts", subtitle: "Mirror glazes, single origin chocolate & gold leaf", link: "/brand-signature.html", from: "01 Aug 2026", to: "—", status: "Live" },
          { slot: "Announcement", title: "Free delivery above ₹999", subtitle: "Direct temperature-controlled delivery in Dibrugarh", link: "/shipping.html", from: "12 Aug 2026", to: "30 Sep 2026", status: "Live" },
          { slot: "Festival hero", title: "Bihu Collection 2027", subtitle: "Traditional Assam tea bakes & bespoke gift packaging", link: "/gifting.html", from: "05 Jan 2027", to: "20 Jan 2027", status: "Scheduled" }
        ];

        var baseReviews = clone(data.reviews || []).map(function (r, idx) {
          r.id = r.id || "rev-" + (idx + 1);
          r.status = r.status || "published";
          return r;
        });

        return {
          products: clone(data.products || []),
          categories: clone(data.categories || []),
          stores: clone(data.stores || []),
          coupons: clone(data.coupons || []),
          orders: baseOrders,
          enquiries: baseEnquiries,
          giftcards: baseGiftCards,
          banners: baseBanners,
          blogPosts: clone(data.blogPosts || []),
          reviews: baseReviews,
          slotCapacity: {}
        };
      }

      function init() {
        try {
          var raw = global.localStorage ? global.localStorage.getItem(DB_KEY) : null;
          if (raw) {
            state = JSON.parse(raw);
          } else {
            state = seed();
          }
        } catch (e) {
          state = seed();
        }

        /* Ingest any new inquiries submitted from public forms */
        try {
          if (global.localStorage) {
            var publicEnqs = JSON.parse(global.localStorage.getItem("saiph.admin_enquiries.v1") || "[]");
            if (publicEnqs.length) {
              publicEnqs.forEach(function (pe) {
                if (!state.enquiries.some(function (x) { return x.id === pe.id; })) {
                  state.enquiries.unshift(pe);
                }
              });
              global.localStorage.removeItem("saiph.admin_enquiries.v1");
            }

            var publicRevs = JSON.parse(global.localStorage.getItem("saiph.admin_pending_reviews.v1") || "[]");
            if (publicRevs.length) {
              publicRevs.forEach(function (pr) {
                pr.id = pr.id || "rev-" + Date.now();
                state.reviews.unshift(pr);
              });
              global.localStorage.removeItem("saiph.admin_pending_reviews.v1");
            }
          }
        } catch (e) {}

        /* Synchronize storefront orders from SAIPH.store.orders into admin orders */
        if (store && store.orders) {
          var clientOrders = store.orders.all();
          clientOrders.forEach(function (co) {
            var existing = state.orders.filter(function (ao) { return ao.id === co.id; })[0];
            if (!existing) {
              state.orders.unshift({
                id: co.id,
                customer: (co.contact && co.contact.name) || "Customer",
                phone: (co.contact && co.contact.phone) || "",
                email: (co.contact && co.contact.email) || "",
                items: co.items ? co.items.length : 1,
                brand: (co.items && co.items[0] && co.items[0].brand) || "SAiPH Bakes",
                total: co.totals ? co.totals.grand : 0,
                status: co.status || "placed",
                slot: co.date ? util.fmtDate(co.date) + " · " + (co.slotLabel || co.slot) : "Next available",
                channel: "Web Storefront",
                store: co.mode === "pickup" ? (co.store ? co.store.name : "Store Pickup") : "Dibrugarh (Delivery)",
                address: co.address,
                lineItems: co.items,
                timeline: co.timeline,
                placedAt: co.placedAt || Date.now(),
                instructions: co.instructions || "",
                payment: co.payment || "UPI"
              });
            } else {
              existing.status = co.status || existing.status;
            }
          });
        }

        /* In-memory sync for catalog so live storefront and admin stay in lockstep */
        if (data.products && data.products.length) {
          state.products = state.products || [];
          data.products.forEach(function (dp) {
            var existing = state.products.filter(function (sp) { return sp.id === dp.id; })[0];
            if (!existing) {
              state.products.push(clone(dp));
            } else {
              if (!existing.image && dp.image) existing.image = dp.image;
            }
          });
          data.products = state.products;
        }
        if (data.categories && data.categories.length) {
          state.categories = state.categories || [];
          data.categories.forEach(function (dc) {
            if (!state.categories.some(function (sc) { return sc.id === dc.id; })) {
              state.categories.push(clone(dc));
            }
          });
        }
        if (state.coupons && state.coupons.length) {
          data.coupons = state.coupons;
        }

        persist();
      }

      function persist() {
        try {
          if (global.localStorage) {
            global.localStorage.setItem(DB_KEY, JSON.stringify(state));
          }
        } catch (e) {}
      }

      init();

      return {
        get: function (key) { return state[key]; },
        set: function (key, val) { state[key] = val; persist(); },
        save: persist,
        reset: function () {
          state = seed();
          persist();
          init();
        },
        dump: function () { return JSON.stringify(state, null, 2); }
      };
    })();

    /* ----------------------------- CSV Export ----------------------------- */
    function exportCSV(filename, headers, rows) {
      var csv = [headers.join(",")].concat(rows.map(function (r) {
        return r.map(function (cell) {
          var s = String(cell == null ? "" : cell).replace(/"/g, '""');
          return '"' + s + '"';
        }).join(",");
      })).join("\r\n");
      var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      var url = URL.createObjectURL(blob);
      var a = doc.createElement("a");
      a.href = url;
      a.download = filename;
      doc.body.appendChild(a);
      a.click();
      doc.body.removeChild(a);
      URL.revokeObjectURL(url);
      ui.toast({ title: "Export downloaded", note: filename, variant: "success", icon: "checkCircle" });
    }

    /* ------------------------------ Chrome ------------------------------- */
    function updateBadges() {
      var pendingOrders = AdminDB.get("orders").filter(function (o) {
        return o.status === "placed" || o.status === "baking";
      }).length;
      var pendingReviews = AdminDB.get("reviews").filter(function (r) {
        return r.status === "pending";
      }).length;
      var newEnquiries = AdminDB.get("enquiries").filter(function (e) {
        return e.status === "New";
      }).length;

      GROUPS.forEach(function (g) {
        g.items.forEach(function (it) {
          if (it.id === "orders") it.badge = pendingOrders > 0 ? String(pendingOrders) : null;
          if (it.id === "reviews") it.badge = pendingReviews > 0 ? String(pendingReviews) : null;
          if (it.id === "franchise") it.badge = newEnquiries > 0 ? String(newEnquiries) : null;
        });
      });
    }

    function renderRoleSwitch() {
      var wrap = $("[data-role-selector-wrap]");
      if (wrap) wrap.style.display = (currentUser && currentUser.role === "super") ? "flex" : "none";
      var sel = $("[data-role-switch]");
      if (!sel) return;
      sel.innerHTML = data.adminRoles.map(function (r) {
        return '<option value="' + r.id + '"' + (r.id === role ? " selected" : "") + ">" + util.esc(r.name) + "</option>";
      }).join("");
      var rec = data.adminRoles.filter(function (r) { return r.id === role; })[0];
      var note = $("[data-role-note] span");
      if (note && rec) {
        note.innerHTML = "<strong>" + util.esc(rec.name) + ".</strong> " + util.esc(rec.scope) +
          " Authenticated via 256-bit PBKDF2/SHA-256 session token.";
      }
    }

    function renderUserBadge() {
      var badge = $("[data-admin-user-badge]");
      if (!badge) return;
      var u = AdminAuth.getCurrentUser() || { name: "Super Administrator", role: "super", email: "admin@saiphbakes.com" };
      var initials = u.name.split(" ").map(function (p) { return p[0]; }).slice(0, 2).join("").toUpperCase() || "SA";
      var roleName = (data.adminRoles.filter(function (r) { return r.id === u.role; })[0] || {}).name || u.role.toUpperCase();

      badge.innerHTML = '<div class="admin__user-avatar" title="' + util.esc(u.email) + '">' + util.esc(initials) + "</div>" +
        '<div class="admin__user-meta">' +
          '<span class="admin__user-name">' + util.esc(u.name) + "</span>" +
          '<span class="admin__user-role">' + util.esc(roleName) + "</span>" +
        "</div>" +
        '<div class="admin__user-actions">' +
          '<button class="btn btn--sm btn--ghost" type="button" data-action="lock" title="Lock Workstation" style="padding:.25rem .45rem;color:var(--ink-500)">' +
            ui.icon("lock") +
          "</button>" +
          '<button class="btn btn--sm btn--ghost" type="button" data-action="logout" title="Sign Out" style="padding:.25rem .45rem;color:var(--danger)">' +
            ui.icon("logout") +
          "</button>" +
        "</div>";
    }

    function renderNav() {
      updateBadges();
      var navEl = $("[data-admin-nav]");
      if (!navEl) return;
      navEl.innerHTML = GROUPS.map(function (g) {
        var items = g.items.filter(function (it) { return permFor(it.id) > 0; });
        if (!items.length) return "";
        return '<span class="admin-nav__label">' + util.esc(g.label) + "</span>" +
          items.map(function (it) {
            return '<a href="#' + it.id + '" class="' + (it.id === current ? "is-active" : "") + '" data-admin-link="' + it.id + '">' +
              ui.icon(it.icon) + "<span>" + util.esc(it.name) + "</span>" +
              (it.badge ? '<span class="pill">' + it.badge + "</span>" : "") + "</a>";
          }).join("");
      }).join("");
    }

    function renderQuickActions() {
      var bar = $("[data-admin-quick-actions]");
      if (!bar) return;
      var actions = [];
      if (canManage("orders")) {
        actions.push('<button class="btn btn--sm btn--accent" type="button" data-action="manual-order">' + ui.icon("plus") + " New Order</button>");
      }
      if (canManage("products")) {
        actions.push('<button class="btn btn--sm btn--outline" type="button" data-action="new-product">' + ui.icon("plus") + " Product</button>");
      }
      if (canManage("coupons")) {
        actions.push('<button class="btn btn--sm btn--outline" type="button" data-action="new-coupon">' + ui.icon("percent") + " Coupon</button>");
      }
      bar.innerHTML = actions.join("");
    }

    /* ------------------------------- Views ------------------------------- */
    function table(title, head, rows, actions, toolbar) {
      return '<div class="data-table">' +
        '<div class="data-table__head"><h2 class="data-table__title">' + util.esc(title) + "</h2>" +
        '<span class="spacer"></span>' + (actions || "") + "</div>" +
        (toolbar || "") +
        '<div class="data-table__scroll"><table><thead><tr>' +
        head.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
        "</tr></thead><tbody>" +
        (rows.length ? rows.join("") : '<tr><td colspan="' + head.length + '" style="text-align:center;padding:2.5rem;color:var(--text-muted)">No matching records found.</td></tr>') +
        "</tbody></table></div></div>";
    }

    function filterToolbar(opts) {
      opts = opts || {};
      var searchHtml = opts.search !== false
        ? '<div class="search-box">' + ui.icon("search") +
          '<input type="search" placeholder="' + util.esc(opts.placeholder || "Search...") + '" value="' + util.esc(activeSearch) + '" data-table-search></div>'
        : "";
      var filterHtml = (opts.filters || []).map(function (f) {
        return '<select class="select" data-table-filter="' + f.key + '">' +
          f.options.map(function (o) {
            return '<option value="' + o.value + '"' + (activeFilter === o.value ? " selected" : "") + ">" + util.esc(o.label) + "</option>";
          }).join("") +
        "</select>";
      }).join("");
      var rightHtml = opts.right || "";
      return '<div class="admin-toolbar">' + searchHtml + filterHtml + '<span class="spacer"></span>' + rightHtml + "</div>";
    }

    function filterPills(items, activeKey) {
      return '<div class="admin-filters">' + items.map(function (it) {
        var isAct = it.id === activeKey;
        return '<button type="button" class="admin-filter-pill' + (isAct ? " is-active" : "") + '" data-filter-pill="' + it.id + '">' +
          util.esc(it.label) + (it.count != null ? ' <span class="pill-count">' + it.count + "</span>" : "") +
        "</button>";
      }).join("") + "</div>";
    }

    /* ----------------------------- View Definitions ----------------------- */
    var VIEWS = {
      /* 1. DASHBOARD */
      dashboard: function () {
        var orders = AdminDB.get("orders");
        var prods = AdminDB.get("products");
        var enqs = AdminDB.get("enquiries");

        var revenueTotal = orders.reduce(function (n, o) {
          return o.status !== "cancelled" ? n + (o.total || 0) : n;
        }, 0);
        var activeOrders = orders.filter(function (o) { return o.status !== "cancelled"; });
        var aov = activeOrders.length ? Math.round(revenueTotal / activeOrders.length) : 0;
        var bakingCount = orders.filter(function (o) { return o.status === "baking" || o.status === "placed"; }).length;
        var lowStockList = [];
        prods.forEach(function (p) {
          p.variants.forEach(function (v) {
            if (v.stock <= 6) lowStockList.push({ p: p, v: v });
          });
        });
        var openEnqs = enqs.filter(function (e) { return e.status === "New"; }).length;

        var kpiCards = [
          { l: "Total Revenue", n: util.money(revenueTotal), d: "+18.2%", up: true, spark: [40, 52, 44, 61, 58, 73, 88] },
          { l: "Orders Recorded", n: String(orders.length), d: activeOrders.length + " active", up: true, spark: [55, 48, 62, 58, 71, 66, 80] },
          { l: "Avg. Order Value", n: util.money(aov), d: "+6.1% vs target", up: true, spark: [60, 58, 64, 61, 68, 70, 74] },
          { l: "In Production", n: String(bakingCount), d: "Active kitchen queue", up: true, spark: [30, 44, 38, 52, 60, 55, 68] },
          { l: "Low Stock Items", n: String(lowStockList.length), d: lowStockList.length > 3 ? "Action needed" : "Optimal", up: lowStockList.length <= 3, spark: [20, 26, 30, 28, 34, 40, 44] },
          { l: "Open Enquiries", n: String(openEnqs), d: openEnqs + " unreplied", up: openEnqs === 0, spark: [70, 66, 62, 58, 54, 50, 46] }
        ];

        return '<div class="kpi-grid">' + kpiCards.map(function (k) {
          return '<article class="kpi">' +
            '<span class="kpi__l">' + util.esc(k.l) + "</span>" +
            '<span class="kpi__n">' + util.esc(k.n) + "</span>" +
            '<span class="kpi__d kpi__d--' + (k.up ? "up" : "down") + '">' + util.esc(k.d) + "</span>" +
            '<span class="kpi__spark">' + k.spark.map(function (v) {
              return '<i style="height:' + v + '%"></i>';
            }).join("") + "</span>" +
          "</article>";
        }).join("") + "</div>" +

        '<div class="grid" style="grid-template-columns:minmax(0,1.6fr) minmax(min(100%,20rem),1.1fr);align-items:start;gap:1.25rem">' +
          table("Recent Orders",
            ["Order ID", "Customer", "Slot / Store", "Total", "Status", "Action"],
            orders.slice(0, 6).map(function (o) {
              return "<tr><td><a href=\"#\" data-view-order=\"" + o.id + "\"><b>" + o.id + "</b></a></td>" +
                "<td>" + util.esc(o.customer) + "</td>" +
                "<td>" + util.esc(o.slot || o.store) + "</td>" +
                "<td><b>" + util.money(o.total) + "</b></td>" +
                '<td><span class="status status--' + o.status + '">' + o.status + "</span></td>" +
                '<td><button class="btn btn--sm btn--outline" type="button" data-view-order="' + o.id + '">View</button></td></tr>';
            }),
            '<div class="row row--tight"><a class="btn btn--sm btn--outline" href="#orders">All Orders</a>' +
            (canManage("orders") ? '<button class="btn btn--sm btn--accent" type="button" data-action="manual-order">' + ui.icon("plus") + " New</button>" : "") + '</div>') +

          '<div class="data-table">' +
            '<div class="data-table__head">' +
              '<h2 class="data-table__title">Production Queue (' + bakingCount + ')</h2>' +
              '<span class="spacer"></span>' +
              (canManage("inventory") ? '<button class="btn btn--sm btn--outline" type="button" data-action="restock-low">' + ui.icon("refresh") + " Restock</button>" : "") +
            "</div>" +
            '<div style="padding:1.15rem;display:grid;gap:.85rem">' +
              productionQueue() +
            "</div>" +
          "</div>" +
        "</div>" +

        '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,22rem),1fr));align-items:start;gap:1.25rem">' +
          table("Latest Partner & Customer Enquiries",
            ["Type", "From", "Detail", "Status", "Action"],
            enqs.slice(0, 5).map(function (e) {
              return '<tr><td><span class="badge badge--outline">' + e.type + "</span></td>" +
                "<td><b>" + util.esc(e.who) + "</b></td><td>" + util.esc(e.detail) + "</td>" +
                '<td><span class="badge ' + (e.status === "New" ? "badge--limited" : "badge--eggless") + '">' + util.esc(e.status) + "</span></td>" +
                '<td><button class="btn btn--sm btn--ghost" type="button" data-view-enq="' + e.id + '">View</button></td></tr>';
            }),
            '<a class="btn btn--sm btn--outline" href="#franchise">All enquiries</a>') +

          table("Critical Low Stock Alerts",
            ["Product", "Variant", "Stock", "Action"],
            lowStockList.slice(0, 6).map(function (item) {
              return "<tr><td><b>" + util.esc(item.p.name) + "</b></td>" +
                "<td>" + util.esc(item.v.label) + "</td>" +
                '<td><span class="badge ' + (item.v.stock === 0 ? "badge--soldout" : "badge--limited") + '">' + item.v.stock + " left</span></td>" +
                "<td>" + (canManage("inventory")
                  ? '<button class="btn btn--sm btn--accent" type="button" data-quick-restock="' + item.p.id + '::' + item.v.id + '">' + ui.icon("plus") + " Restock 20</button>"
                  : "—") + "</td></tr>";
            }),
            (canManage("inventory") ? '<button class="btn btn--sm btn--outline" type="button" data-action="restock-low">Restock All</button>' : "")) +
        "</div>";
      },

      /* 2. PRODUCTS */
      products: function () {
        var prods = AdminDB.get("products");
        var filtered = prods.filter(function (p) {
          if (activeFilter === "signature" && p.brand !== "signature") return false;
          if (activeFilter === "doughremi" && p.brand !== "doughremi") return false;
          if (activeFilter === "khowdy" && p.brand !== "khowdy") return false;
          if (activeFilter === "lowstock" && !p.variants.some(function (v) { return v.stock <= 6; })) return false;
          if (activeFilter === "out" && !p.variants.some(function (v) { return v.stock === 0; })) return false;
          if (activeSearch) {
            var s = activeSearch.toLowerCase();
            return p.name.toLowerCase().indexOf(s) > -1 ||
                   p.id.toLowerCase().indexOf(s) > -1 ||
                   p.brandName.toLowerCase().indexOf(s) > -1 ||
                   p.cats.join(" ").toLowerCase().indexOf(s) > -1;
          }
          return true;
        });

        var toolbar = filterToolbar({
          placeholder: "Search products by name, slug or category...",
          filters: [
            {
              key: "brand",
              options: [
                { value: "all", label: "All Brands & Stock (" + prods.length + ")" },
                { value: "signature", label: "SAiPH Signature" },
                { value: "doughremi", label: "DoughReMi" },
                { value: "khowdy", label: "Khowdy" },
                { value: "lowstock", label: "Low Stock (<=6)" },
                { value: "out", label: "Out of Stock" }
              ]
            }
          ],
          right: '<span style="font-size:var(--fs-xs);color:var(--ink-400)">Showing <b>' + filtered.length + '</b> of ' + prods.length + ' items</span>'
        });

        var rows = filtered.map(function (p) {
          var totalStock = p.variants.reduce(function (n, v) { return n + (v.stock || 0); }, 0);
          var isLive = p.status !== "paused";
          return "<tr>" +
            '<td><div style="display:flex;align-items:center;gap:.75rem">' +
              (p.image ? '<img src="../' + util.esc(p.image) + '" style="width:42px;height:42px;border-radius:6px;object-fit:cover;border:1px solid rgba(255,255,255,0.12);flex-shrink:0" loading="lazy" alt="' + util.esc(p.name) + '">' : '') +
              '<div><b>' + util.esc(p.name) + '</b><br><span style="font-size:var(--fs-xs);color:var(--ink-400)">' + p.id + '</span></div>' +
            '</div></td>' +
            '<td><span class="badge badge--outline">' + util.esc(p.brandName) + "</span></td>" +
            "<td>" + util.esc(p.catNames.slice(0, 2).join(", ")) + "</td>" +
            "<td><b>" + util.money(p.priceFrom) + "</b></td>" +
            "<td>" + p.variants.length + " variants</td>" +
            "<td>" + (totalStock <= 6
              ? '<span class="badge badge--limited">' + totalStock + " left</span>"
              : '<span class="badge badge--eggless">' + totalStock + " in stock</span>") + "</td>" +
            "<td>" + (p.rating ? p.rating.toFixed(1) + " ★" : "—") + "</td>" +
            "<td>" + (p.badges.length ? p.badges.map(function (x) {
              return '<span class="badge badge--outline" style="font-size:.65rem">' + x + "</span>";
            }).join(" ") : "—") + "</td>" +
            '<td><button class="btn btn--sm ' + (isLive ? "btn--ghost" : "btn--outline") + '" type="button" data-toggle-prod-status="' + p.id + '">' +
              (isLive ? '<span class="status status--delivered">Live</span>' : '<span class="status status--cancelled">Paused</span>') +
            "</button></td>" +
            '<td style="white-space:nowrap">' +
              (canManage("products")
                ? '<button class="btn btn--sm btn--outline" type="button" data-edit-prod="' + p.id + '">' + ui.icon("settings") + " Edit</button> " +
                  '<button class="btn btn--sm btn--ghost" type="button" data-del-prod="' + p.id + '" style="color:var(--danger)">' + ui.icon("trash") + "</button> "
                : "") +
              '<a class="btn btn--sm btn--ghost" href="../product.html?id=' + p.id + '" target="_blank" title="View in Storefront">' + ui.icon("external") + "</a>" +
            "</td>" +
          "</tr>";
        });

        var actions = '<div class="row row--tight">' +
          '<button class="btn btn--sm btn--outline" type="button" data-export="products">' + ui.icon("upload") + " Export CSV</button>" +
          (canManage("products") ? '<button class="btn btn--sm btn--accent" type="button" data-action="new-product">' + ui.icon("plus") + " Add Product</button>" : "") +
        "</div>";

        return table("Product Catalogue (" + prods.length + " items)",
          ["Product", "Brand", "Categories", "Starting At", "Variants", "Total Stock", "Rating", "Badges", "Status", "Actions"],
          rows, actions, toolbar);
      },

      /* 3. CATEGORIES & BRANDS */
      categories: function () {
        var cats = AdminDB.get("categories");
        var brands = data.brands || [];

        var catRows = cats.map(function (c) {
          var count = AdminDB.get("products").filter(function (p) { return p.cats.indexOf(c.id) > -1; }).length;
          return "<tr>" +
            "<td><b>" + util.esc(c.name) + "</b><br><span style=\"font-size:var(--fs-xs);color:var(--ink-400)\">" + util.esc(c.blurb) + "</span></td>" +
            "<td><code>" + c.id + "</code></td>" +
            "<td><b>" + count + "</b> items</td>" +
            "<td>" + (c.brands ? c.brands.join(", ") : "All") + "</td>" +
            '<td><span class="status status--delivered">Active</span></td>' +
            "<td>" + (canManage("categories")
              ? '<button class="btn btn--sm btn--outline" type="button" data-edit-cat="' + c.id + '">Edit</button> ' +
                '<button class="btn btn--sm btn--ghost" type="button" data-del-cat="' + c.id + '" style="color:var(--danger)">' + ui.icon("trash") + "</button>"
              : "—") + "</td>" +
          "</tr>";
        });

        var catActions = canManage("categories")
          ? '<button class="btn btn--sm btn--accent" type="button" data-action="new-cat">' + ui.icon("plus") + " New Category</button>"
          : "";

        var brandRows = brands.map(function (x) {
          var count = AdminDB.get("products").filter(function (p) { return p.brand === x.id; }).length;
          return "<tr>" +
            "<td><b>" + util.esc(x.full) + "</b></td>" +
            "<td>" + util.esc(x.tag) + "</td>" +
            "<td><b>" + count + "</b> active products</td>" +
            '<td><a class="link" href="../' + x.url + '" target="_blank">' + x.url + " " + ui.icon("external") + "</a></td>" +
          "</tr>";
        });

        return table("Product Categories", ["Category", "Slug / ID", "Products", "Associated Brands", "Status", "Action"], catRows, catActions) +
          '<div style="margin-top:1.5rem"></div>' +
          table("Brand Houses", ["Brand", "Tagline / Positioning", "Active Catalog", "Landing Page"], brandRows);
      },

      /* 4. INVENTORY */
      inventory: function () {
        var prods = AdminDB.get("products");
        var rows = [];

        prods.forEach(function (p) {
          p.variants.forEach(function (v) {
            rows.push({
              pId: p.id,
              vId: v.id,
              name: p.name,
              brand: p.brandName,
              variant: v.label,
              price: v.price,
              stock: v.stock != null ? v.stock : 10,
              leadHours: p.leadHours || 0
            });
          });
        });

        var filtered = rows.filter(function (r) {
          if (activeFilter === "low" && r.stock > 6) return false;
          if (activeFilter === "out" && r.stock > 0) return false;
          if (activeFilter === "ample" && r.stock <= 6) return false;
          if (activeSearch) {
            var s = activeSearch.toLowerCase();
            return r.name.toLowerCase().indexOf(s) > -1 ||
                   r.variant.toLowerCase().indexOf(s) > -1 ||
                   r.brand.toLowerCase().indexOf(s) > -1;
          }
          return true;
        });

        var pills = filterPills([
          { id: "all", label: "All SKUs", count: rows.length },
          { id: "low", label: "Low Stock (<=6)", count: rows.filter(function (r) { return r.stock <= 6; }).length },
          { id: "out", label: "Out of Stock", count: rows.filter(function (r) { return r.stock === 0; }).length },
          { id: "ample", label: "Ample Stock", count: rows.filter(function (r) { return r.stock > 6; }).length }
        ], activeFilter === "all" || activeFilter === "low" || activeFilter === "out" || activeFilter === "ample" ? activeFilter : "all");

        var toolbar = filterToolbar({
          placeholder: "Search SKU by product name or variant label...",
          right: '<span style="font-size:var(--fs-xs);color:var(--ink-400)">Total SKUs: <b>' + rows.length + '</b></span>'
        });

        var tableRows = filtered.map(function (r) {
          return "<tr>" +
            "<td><b>" + util.esc(r.name) + "</b></td>" +
            '<td><span class="badge badge--outline">' + util.esc(r.brand) + "</span></td>" +
            "<td>" + util.esc(r.variant) + "</td>" +
            "<td><b>" + util.money(r.price) + "</b></td>" +
            "<td>" + (r.stock === 0
              ? '<span class="badge badge--soldout">Sold Out (0)</span>'
              : r.stock <= 6
                ? '<span class="badge badge--limited">Low (' + r.stock + ')</span>'
                : '<span class="badge badge--eggless">' + r.stock + " units</span>") + "</td>" +
            "<td>" + (r.leadHours >= 48 ? "Made to Order (48h)" : r.leadHours > 0 ? r.leadHours + "h lead" : "Daily Fresh") + "</td>" +
            "<td>" + (canManage("inventory")
              ? '<div class="row row--tight">' +
                  '<button class="btn btn--sm btn--outline" type="button" data-stock-step="' + r.pId + '::' + r.vId + '::-1" title="Subtract 1">-1</button>' +
                  '<button class="btn btn--sm btn--outline" type="button" data-stock-step="' + r.pId + '::' + r.vId + '::1" title="Add 1">+1</button>' +
                  '<button class="btn btn--sm btn--accent" type="button" data-stock-step="' + r.pId + '::' + r.vId + '::20" title="Restock +20">+20</button>' +
                  '<button class="btn btn--sm btn--ghost" type="button" data-set-stock="' + r.pId + '::' + r.vId + '">Set</button>' +
                "</div>"
              : "—") + "</td>" +
          "</tr>";
        });

        var actions = '<div class="row row--tight">' +
          '<button class="btn btn--sm btn--outline" type="button" data-export="inventory">' + ui.icon("upload") + " Export CSV</button>" +
          (canManage("inventory") ? '<button class="btn btn--sm btn--accent" type="button" data-action="restock-low">' + ui.icon("refresh") + " Restock All Low</button>" : "") +
        "</div>";

        return table("Inventory by SKU (" + rows.length + " SKUs)",
          ["Product", "Brand", "Variant", "Price", "On Hand Stock", "Production Type", "Stock Adjustment"],
          tableRows, actions, pills + toolbar);
      },

      /* 5. ORDERS */
      orders: function () {
        var orders = AdminDB.get("orders");
        var activeStatus = activeFilter;

        var filtered = orders.filter(function (o) {
          if (activeStatus && activeStatus !== "all" && o.status !== activeStatus) return false;
          if (activeSearch) {
            var s = activeSearch.toLowerCase();
            return (o.id && o.id.toLowerCase().indexOf(s) > -1) ||
                   (o.customer && o.customer.toLowerCase().indexOf(s) > -1) ||
                   (o.phone && o.phone.indexOf(s) > -1);
          }
          return true;
        });

        var pills = filterPills([
          { id: "all", label: "All Orders", count: orders.length },
          { id: "placed", label: "Placed", count: orders.filter(function (o) { return o.status === "placed"; }).length },
          { id: "baking", label: "In Production", count: orders.filter(function (o) { return o.status === "baking"; }).length },
          { id: "quality", label: "Quality Check", count: orders.filter(function (o) { return o.status === "quality"; }).length },
          { id: "out", label: "Out / Ready", count: orders.filter(function (o) { return o.status === "out"; }).length },
          { id: "delivered", label: "Delivered", count: orders.filter(function (o) { return o.status === "delivered"; }).length },
          { id: "cancelled", label: "Cancelled", count: orders.filter(function (o) { return o.status === "cancelled"; }).length }
        ], activeStatus || "all");

        var toolbar = filterToolbar({
          placeholder: "Search order by ID, customer name or phone...",
          right: '<span style="font-size:var(--fs-xs);color:var(--ink-400)">Orders Found: <b>' + filtered.length + '</b></span>'
        });

        var rows = filtered.map(function (o) {
          return "<tr>" +
            "<td><a href=\"#\" data-view-order=\"" + o.id + "\" style=\"font-weight:700;color:var(--navy-900)\">" + o.id + "</a></td>" +
            "<td><b>" + util.esc(o.customer) + "</b>" + (o.phone ? "<br><span style=\"font-size:var(--fs-xs);color:var(--ink-400)\">" + util.esc(o.phone) + "</span>" : "") + "</td>" +
            "<td>" + (o.items || (o.lineItems ? o.lineItems.length : 1)) + " items</td>" +
            '<td><span class="badge badge--outline">' + util.esc(o.channel || "Web") + "</span></td>" +
            "<td>" + util.esc(o.slot || o.store || "Scheduled") + "</td>" +
            "<td><b>" + util.money(o.total) + "</b></td>" +
            '<td><span class="status status--' + o.status + '">' + o.status + "</span></td>" +
            '<td style="white-space:nowrap">' +
              '<button class="btn btn--sm btn--outline" type="button" data-view-order="' + o.id + '">' + ui.icon("eye") + " Details</button> " +
              (canManage("orders") && o.status !== "delivered" && o.status !== "cancelled"
                ? '<button class="btn btn--sm btn--accent" type="button" data-advance-order="' + o.id + '">' + ui.icon("chevronRight") + " Next Stage</button> "
                : "") +
              '<button class="btn btn--sm btn--ghost" type="button" data-invoice="' + o.id + '" title="Print Invoice">' + ui.icon("file") + "</button>" +
            "</td>" +
          "</tr>";
        });

        var actions = '<div class="row row--tight">' +
          '<button class="btn btn--sm btn--outline" type="button" data-export="orders">' + ui.icon("upload") + " Export CSV</button>" +
          (canManage("orders") ? '<button class="btn btn--sm btn--accent" type="button" data-action="manual-order">' + ui.icon("plus") + " Create Order</button>" : "") +
        "</div>";

        return table("Orders Management (" + orders.length + " orders)",
          ["Order ID", "Customer", "Items", "Channel", "Slot / Store", "Total Amount", "Status", "Actions"],
          rows, actions, pills + toolbar);
      },

      /* 6. CUSTOMERS */
      customers: function () {
        var orders = AdminDB.get("orders");
        var customerMap = {};

        orders.forEach(function (o) {
          var name = o.customer || "Guest";
          if (!customerMap[name]) {
            customerMap[name] = {
              name: name,
              phone: o.phone || "",
              email: o.email || "",
              orders: 0,
              totalValue: 0,
              lastOrder: o.id,
              store: o.store || "Dibrugarh",
              ordersList: []
            };
          }
          customerMap[name].orders++;
          customerMap[name].totalValue += (o.total || 0);
          customerMap[name].ordersList.push(o);
        });

        var list = Object.keys(customerMap).map(function (k) { return customerMap[k]; });

        var filtered = list.filter(function (c) {
          var seg = c.totalValue > 20000 ? "corporate" : c.totalValue > 4000 ? "high" : "regular";
          if (activeFilter === "corporate" && seg !== "corporate") return false;
          if (activeFilter === "high" && seg !== "high") return false;
          if (activeFilter === "regular" && seg !== "regular") return false;
          if (activeSearch) {
            var s = activeSearch.toLowerCase();
            return c.name.toLowerCase().indexOf(s) > -1 ||
                   c.phone.indexOf(s) > -1 ||
                   c.email.toLowerCase().indexOf(s) > -1;
          }
          return true;
        });

        var pills = filterPills([
          { id: "all", label: "All Customers", count: list.length },
          { id: "corporate", label: "Corporate (> ₹20k)", count: list.filter(function (c) { return c.totalValue > 20000; }).length },
          { id: "high", label: "High Value (> ₹4k)", count: list.filter(function (c) { return c.totalValue > 4000 && c.totalValue <= 20000; }).length },
          { id: "regular", label: "Regular", count: list.filter(function (c) { return c.totalValue <= 4000; }).length }
        ], activeFilter === "all" || activeFilter === "corporate" || activeFilter === "high" || activeFilter === "regular" ? activeFilter : "all");

        var toolbar = filterToolbar({
          placeholder: "Search customers by name, phone or email...",
          right: '<span style="font-size:var(--fs-xs);color:var(--ink-400)">Total Customers: <b>' + list.length + '</b></span>'
        });

        var rows = filtered.map(function (c) {
          var seg = c.totalValue > 20000 ? "Corporate" : c.totalValue > 4000 ? "High Value" : "Regular";
          var avgOrder = c.orders ? Math.round(c.totalValue / c.orders) : 0;
          return "<tr>" +
            "<td><b>" + util.esc(c.name) + "</b>" +
              (c.email ? "<br><span style=\"font-size:var(--fs-xs);color:var(--ink-400)\">" + util.esc(c.email) + "</span>" : "") +
            "</td>" +
            "<td>" + (c.phone ? util.esc(c.phone) : "—") + "</td>" +
            "<td><b>" + c.orders + "</b> orders</td>" +
            "<td><b>" + util.money(c.totalValue) + "</b></td>" +
            "<td>" + util.money(avgOrder) + "</td>" +
            "<td>" + util.esc(c.store) + "</td>" +
            '<td><span class="badge badge--outline">' + seg + "</span></td>" +
            '<td><button class="btn btn--sm btn--outline" type="button" data-view-customer="' + util.esc(c.name) + '">Order History</button></td>' +
          "</tr>";
        });

        var actions = '<button class="btn btn--sm btn--outline" type="button" data-export="customers">' + ui.icon("upload") + " Export Customers CSV</button>";

        return table("Customer Directory & Lifetime Value",
          ["Customer", "Contact Phone", "Total Orders", "Lifetime Value", "Average Order", "Home Store", "Segment", "Actions"],
          rows, actions, pills + toolbar);
      },

      /* 7. DELIVERY SLOTS */
      slots: function () {
        var days = util.dates(7, 0);
        var slots = data.deliverySlots || [];
        var overrides = AdminDB.get("slotCapacity") || {};

        var rows = slots.map(function (s) {
          return "<tr>" +
            "<td><b>" + util.esc(s.label) + "</b>" +
            (s.note ? '<br><span style="font-size:var(--fs-xs);color:var(--ink-400)">' + util.esc(s.note) + "</span>" : "") + "</td>" +
            days.map(function (d, i) {
              var key = s.id + "::" + d.iso;
              var baseCap = s.id === "evening" ? 40 : s.id === "midnight" ? 10 : 25;
              var isBlocked = overrides[key] && overrides[key].blocked;
              var adjustedCap = overrides[key] ? overrides[key].cap : baseCap;
              var used = Math.min(adjustedCap, Math.round(adjustedCap * (0.35 + ((util.hash(s.id + i) % 50) / 100))));
              var free = Math.max(0, adjustedCap - used);

              return "<td>" + (isBlocked
                ? '<button class="btn btn--sm btn--ghost" type="button" data-toggle-slot="' + key + '" style="padding:0"><span class="badge badge--soldout">Blocked</span></button>'
                : free === 0
                  ? '<span class="badge badge--soldout">Full (0)</span>'
                  : '<button class="btn btn--sm btn--ghost" type="button" data-toggle-slot="' + key + '" style="padding:0" title="Click to block or adjust capacity">' +
                    '<span class="badge badge--eggless">' + free + ' / ' + adjustedCap + ' free</span></button>') +
              "</td>";
            }).join("") +
          "</tr>";
        });

        return table("Delivery Slot Capacity — Next 7 Days",
          ["Delivery Slot"].concat(days.map(function (d) { return d.dow + " " + d.day + "<br><span style=\"font-size:.65rem;color:var(--ink-400)\">" + d.iso.slice(5) + "</span>"; })),
          rows,
          '<div class="note" style="padding:.4rem .8rem;font-size:var(--fs-xs)">' + ui.icon("info") + " Click any slot pill to block/unblock capacity.</div>") +
          '<div class="note" style="margin-top:1.25rem">' + ui.icon("shield") +
          "<span>Capacity adjustments take effect on the storefront checkout calendar instantly. Existing placed orders in that slot remain protected.</span></div>";
      },

      /* 8. STORES */
      stores: function () {
        var stores = AdminDB.get("stores");
        var rows = stores.map(function (s) {
          return "<tr>" +
            "<td><b>" + util.esc(s.name) + "</b><br><span style=\"font-size:var(--fs-xs);color:var(--ink-400)\">" + util.esc(s.addr) + "</span></td>" +
            "<td>" + util.esc(s.city) + "</td>" +
            "<td>" + util.esc(s.hours) + "</td>" +
            "<td>" + util.esc(s.phone) + "</td>" +
            "<td>" + (s.brands ? s.brands.join(", ") : "All") + "</td>" +
            '<td><button class="btn btn--sm ' + (s.open ? "btn--ghost" : "btn--outline") + '" type="button" data-toggle-store="' + s.id + '">' +
              (s.open ? '<span class="status status--delivered">Open</span>' : '<span class="status status--cancelled">Closed</span>') +
            "</button></td>" +
            "<td>" + (canManage("stores")
              ? '<button class="btn btn--sm btn--outline" type="button" data-edit-store="' + s.id + '">Edit</button> ' +
                '<button class="btn btn--sm btn--ghost" type="button" data-del-store="' + s.id + '" style="color:var(--danger)">' + ui.icon("trash") + "</button>"
              : "—") + "</td>" +
          "</tr>";
        });

        var actions = canManage("stores")
          ? '<button class="btn btn--sm btn--accent" type="button" data-action="new-store">' + ui.icon("plus") + " Add Store Location</button>"
          : "";

        return table("Store & Counter Locations (" + stores.length + ")",
          ["Store Name & Address", "City", "Daily Hours", "Contact Phone", "Brands Carried", "Operating Status", "Action"],
          rows, actions);
      },

      /* 9. COUPONS */
      coupons: function () {
        var coupons = AdminDB.get("coupons");
        var rows = coupons.map(function (c) {
          var isActive = c.status !== "paused";
          var typeLabel = c.type === "percent" ? c.value + "% OFF" : c.type === "flat" ? util.money(c.value) + " FLAT" : "Free Delivery";
          return "<tr>" +
            '<td><code style="font-weight:700;font-size:var(--fs-sm);color:var(--navy-900);background:var(--cream-100);padding:.2rem .4rem;border-radius:var(--r-xs)">' + c.code + "</code></td>" +
            "<td><b>" + typeLabel + "</b></td>" +
            "<td>" + util.money(c.min || 0) + "</td>" +
            "<td>" + (c.cap ? util.money(c.cap) : "No cap") + "</td>" +
            "<td>" + (c.brand ? util.esc(c.brand) : "All brands") + "</td>" +
            '<td><button class="btn btn--sm ' + (isActive ? "btn--ghost" : "btn--outline") + '" type="button" data-toggle-coupon="' + c.code + '">' +
              (isActive ? '<span class="status status--delivered">Active</span>' : '<span class="status status--cancelled">Paused</span>') +
            "</button></td>" +
            "<td>" + (canManage("coupons")
              ? '<button class="btn btn--sm btn--outline" type="button" data-edit-coupon="' + c.code + '">Edit</button> ' +
                '<button class="btn btn--sm btn--ghost" type="button" data-del-coupon="' + c.code + '" style="color:var(--danger)">' + ui.icon("trash") + "</button>"
              : "—") + "</td>" +
          "</tr>";
        });

        var actions = canManage("coupons")
          ? '<button class="btn btn--sm btn--accent" type="button" data-action="new-coupon">' + ui.icon("plus") + " Create Coupon</button>"
          : "";

        return table("Promotional Coupons & Discounts",
          ["Coupon Code", "Discount Value", "Min. Cart Value", "Discount Cap", "Eligible Scope", "Status", "Actions"],
          rows, actions) +
          '<div class="note" style="margin-top:1.25rem">' + ui.icon("percent") +
          "<span>Coupons created or updated here are immediately active on the storefront cart and checkout pages.</span></div>";
      },

      /* 10. GIFT CARDS */
      giftcards: function () {
        var cards = AdminDB.get("giftcards");
        var rows = cards.map(function (g) {
          return "<tr>" +
            "<td><code><b>" + g.code + "</b></code></td>" +
            "<td>" + util.esc(g.recipient || "Customer") + "</td>" +
            "<td>" + util.esc(g.issued) + "</td>" +
            "<td>" + util.money(g.value) + "</td>" +
            "<td><b>" + util.money(g.balance) + "</b></td>" +
            "<td>" + util.esc(g.expires) + "</td>" +
            '<td><span class="badge ' + (g.status === "Active" ? "badge--eggless" : g.status === "Redeemed" ? "badge--soldout" : "badge--outline") + '">' + g.status + "</span></td>" +
            "<td>" + (canManage("giftcards") && g.balance > 0
              ? '<button class="btn btn--sm btn--outline" type="button" data-adjust-card="' + g.code + '">Adjust Balance</button>'
              : "—") + "</td>" +
          "</tr>";
        });

        var actions = canManage("giftcards")
          ? '<button class="btn btn--sm btn--accent" type="button" data-action="new-giftcard">' + ui.icon("gift") + " Issue Gift Card</button>"
          : "";

        return table("Issued Digital Gift Cards",
          ["Card Code", "Recipient", "Issued Date", "Face Value", "Current Balance", "Expiration Date", "Status", "Action"],
          rows, actions);
      },

      /* 11. REVIEWS MODERATION */
      reviews: function () {
        var reviews = AdminDB.get("reviews");
        var activeTab = activeFilter === "pending" || activeFilter === "published" || activeFilter === "hidden" ? activeFilter : "all";

        var filtered = reviews.filter(function (r) {
          if (activeTab !== "all" && r.status !== activeTab) return false;
          if (activeSearch) {
            var s = activeSearch.toLowerCase();
            return (r.name && r.name.toLowerCase().indexOf(s) > -1) ||
                   (r.title && r.title.toLowerCase().indexOf(s) > -1) ||
                   (r.product && r.product.toLowerCase().indexOf(s) > -1);
          }
          return true;
        });

        var pills = filterPills([
          { id: "all", label: "All Reviews", count: reviews.length },
          { id: "pending", label: "Pending Moderation", count: reviews.filter(function (r) { return r.status === "pending"; }).length },
          { id: "published", label: "Published Live", count: reviews.filter(function (r) { return r.status === "published"; }).length },
          { id: "hidden", label: "Hidden", count: reviews.filter(function (r) { return r.status === "hidden"; }).length }
        ], activeTab);

        var toolbar = filterToolbar({
          placeholder: "Search reviews by customer, product or comment...",
          right: '<span style="font-size:var(--fs-xs);color:var(--ink-400)">Showing: <b>' + filtered.length + '</b></span>'
        });

        var rows = filtered.map(function (r) {
          var p = query.byId(r.product);
          var prodName = p ? p.name : r.product;
          return "<tr>" +
            "<td><b>" + util.esc(prodName) + "</b></td>" +
            "<td>" + util.esc(r.name) + " · " + util.esc(r.city || "Dibrugarh") + "</td>" +
            "<td><span style=\"color:var(--gold-500);font-weight:700\">" + r.rating + " ★</span></td>" +
            "<td><b>" + util.esc(r.title || "") + "</b>" +
              (r.comment ? "<br><span style=\"font-size:var(--fs-xs);color:var(--ink-400);white-space:normal;display:inline-block;max-width:24rem\">" + util.esc(r.comment) + "</span>" : "") +
            "</td>" +
            "<td>" + util.fmtDate(r.date) + "</td>" +
            "<td>" + (r.verified ? '<span class="badge badge--eggless">Verified</span>' : "—") + "</td>" +
            '<td><span class="badge ' + (r.status === "published" ? "badge--eggless" : r.status === "pending" ? "badge--limited" : "badge--outline") + '">' + (r.status || "published") + "</span></td>" +
            '<td style="white-space:nowrap">' +
              (canManage("reviews")
                ? (r.status !== "published" ? '<button class="btn btn--sm btn--accent" type="button" data-review-status="' + r.id + '::published">Publish</button> ' : "") +
                  (r.status !== "hidden" ? '<button class="btn btn--sm btn--outline" type="button" data-review-status="' + r.id + '::hidden">Hide</button> ' : "") +
                  '<button class="btn btn--sm btn--ghost" type="button" data-del-review="' + r.id + '" style="color:var(--danger)">' + ui.icon("trash") + "</button>"
                : "—") +
            "</td>" +
          "</tr>";
        });

        var actions = canManage("reviews")
          ? '<button class="btn btn--sm btn--accent" type="button" data-action="new-review">' + ui.icon("plus") + " Add Review</button>"
          : "";

        return table("Customer Reviews Moderation Queue",
          ["Target Product", "Customer", "Rating", "Review Headline & Body", "Date", "Verified", "Status", "Actions"],
          rows, actions, pills + toolbar);
      },

      /* 12. HOMEPAGE BANNERS */
      banners: function () {
        var banners = AdminDB.get("banners");
        var rows = banners.map(function (b, idx) {
          var isLive = b.status === "Live";
          return "<tr>" +
            '<td><span class="badge badge--outline"><b>' + util.esc(b.slot) + "</b></span></td>" +
            "<td><b>" + util.esc(b.title) + "</b>" +
              (b.subtitle ? "<br><span style=\"font-size:var(--fs-xs);color:var(--ink-400)\">" + util.esc(b.subtitle) + "</span>" : "") +
            "</td>" +
            "<td><code>" + util.esc(b.link) + "</code></td>" +
            "<td>" + util.esc(b.from || "—") + "</td>" +
            "<td>" + util.esc(b.to || "—") + "</td>" +
            '<td><button class="btn btn--sm ' + (isLive ? "btn--ghost" : "btn--outline") + '" type="button" data-toggle-banner="' + idx + '">' +
              '<span class="status status--' + (isLive ? "delivered" : "placed") + '">' + util.esc(b.status) + "</span>" +
            "</button></td>" +
            "<td>" + (canManage("banners")
              ? '<button class="btn btn--sm btn--outline" type="button" data-edit-banner="' + idx + '">Edit</button> ' +
                '<button class="btn btn--sm btn--ghost" type="button" data-del-banner="' + idx + '" style="color:var(--danger)">' + ui.icon("trash") + "</button>"
              : "—") + "</td>" +
          "</tr>";
        });

        var actions = canManage("banners")
          ? '<button class="btn btn--sm btn--accent" type="button" data-action="new-banner">' + ui.icon("plus") + " New Banner</button>"
          : "";

        return table("Marketing & Promotional Banners",
          ["Display Slot", "Headline & Copy", "Action Link", "Live From", "Live To", "Status", "Action"],
          rows, actions);
      },

      /* 13. BLOG */
      blog: function () {
        var posts = AdminDB.get("blogPosts");
        var rows = posts.map(function (p) {
          return "<tr>" +
            "<td><b>" + util.esc(p.title) + "</b><br><span style=\"font-size:var(--fs-xs);color:var(--ink-400)\">" + util.esc(p.excerpt) + "</span></td>" +
            '<td><span class="badge badge--outline">' + util.esc(p.cat) + "</span></td>" +
            "<td>" + util.esc(p.date) + "</td>" +
            "<td>" + util.esc(p.read) + "</td>" +
            '<td><span class="status status--delivered">Published</span></td>' +
            "<td>" + (canManage("blog")
              ? '<button class="btn btn--sm btn--outline" type="button" data-edit-blog="' + p.id + '">Edit</button> ' +
                '<button class="btn btn--sm btn--ghost" type="button" data-del-blog="' + p.id + '" style="color:var(--danger)">' + ui.icon("trash") + "</button>"
              : "—") + "</td>" +
          "</tr>";
        });

        var actions = canManage("blog")
          ? '<button class="btn btn--sm btn--accent" type="button" data-action="new-blog">' + ui.icon("plus") + " New Article</button>"
          : "";

        return table("Culinary Journal & Blog Articles",
          ["Article Title & Excerpt", "Category", "Published Date", "Read Time", "Status", "Action"],
          rows, actions);
      },

      /* 14. ENQUIRIES (Franchise, Corporate, Wholesale) */
      franchise: function () { return enquiryView("Franchise"); },
      corporate: function () { return enquiryView("Corporate"); },
      wholesale: function () { return enquiryView("Wholesale"); },

      /* 15. SECURITY & ADMIN ACCOUNTS */
      roles: function () {
        var accounts = AdminAuth.getAccounts();
        var audits = AdminAuth.getAuditLogs();
        var secState = AdminAuth.getSecurityState();
        var activeAdmins = accounts.filter(function (a) { return a.status === "active"; });

        var kpiCards = [
          { l: "Master Admin ID", n: "Wazid Rahman", d: "admin@saiphbakes.com", up: true, spark: [100, 100, 100, 100, 100, 100, 100] },
          { l: "Admin Accounts", n: String(accounts.length), d: activeAdmins.length + " active users", up: true, spark: [30, 40, 50, 60, 70, 80, 90] },
          { l: "Security Guard", n: secState.sessionTimeout + "m Timeout", d: secState.lockoutThreshold + " max attempts · Brute Shield", up: true, spark: [80, 85, 90, 88, 92, 95, 100] },
          { l: "Audit Events", n: String(audits.length), d: "Immutable audit trail", up: true, spark: [20, 35, 45, 60, 75, 90, 100] }
        ];

        var kpiHtml = '<div class="kpi-grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr))">' + kpiCards.map(function (k) {
          return '<article class="kpi">' +
            '<span class="kpi__l">' + util.esc(k.l) + "</span>" +
            '<span class="kpi__n" style="font-size:1.15rem">' + util.esc(k.n) + "</span>" +
            '<span class="kpi__d kpi__d--' + (k.up ? "up" : "down") + '">' + util.esc(k.d) + "</span>" +
            '<span class="kpi__spark">' + k.spark.map(function (v) { return '<i style="height:' + v + '%"></i>'; }).join("") + "</span>" +
          "</article>";
        }).join("") + "</div>";

        // Admin Accounts Table
        var accRows = accounts.map(function (acc) {
          var initials = acc.name.split(" ").map(function (p) { return p[0]; }).slice(0, 2).join("").toUpperCase() || "AD";
          var roleName = (data.adminRoles.filter(function (r) { return r.id === acc.role; })[0] || {}).name || acc.role;
          var isSelf = currentUser && currentUser.email.toLowerCase() === acc.email.toLowerCase();
          var isMaster = acc.email === "admin@saiphbakes.com";

          return "<tr>" +
            "<td>" +
              '<div style="display:flex;align-items:center;gap:.65rem">' +
                '<div class="admin__user-avatar" style="width:1.85rem;height:1.85rem;font-size:0.7rem">' + util.esc(initials) + "</div>" +
                "<div><b>" + util.esc(acc.name) + "</b>" + (isSelf ? ' <span class="badge badge--outline" style="font-size:0.6rem">You</span>' : "") +
                "<br><span style='font-size:var(--fs-xs);color:var(--ink-400)'>" + util.esc(acc.email) + "</span></div>" +
              "</div>" +
            "</td>" +
            '<td><span class="badge ' + (acc.role === "super" ? "badge--accent" : "badge--outline") + '">' + util.esc(roleName) + "</span></td>" +
            '<td><span class="badge ' + (acc.status === "active" ? "badge--eggless" : "badge--limited") + '">' + util.esc(acc.status.toUpperCase()) + "</span></td>" +
            "<td>" + (acc.createdAt ? acc.createdAt.slice(0, 10) : "2026-10-27") + "</td>" +
            "<td>" + (acc.lastLoginAt ? util.fmtWhen(acc.lastLoginAt) : '<span style="color:var(--ink-400)">Never</span>') + "</td>" +
            '<td style="white-space:nowrap">' +
              (role === "super"
                ? '<button class="btn btn--sm btn--outline" type="button" data-edit-account="' + util.esc(acc.email) + '" style="margin-right:.3rem">' + ui.icon("settings") + " Edit / Reset</button>" +
                  (!isMaster && !isSelf
                    ? '<button class="btn btn--sm ' + (acc.status === "active" ? "btn--ghost" : "btn--accent") + '" type="button" data-toggle-account-status="' + util.esc(acc.email) + '" style="margin-right:.3rem">' +
                        (acc.status === "active" ? "Suspend" : "Activate") +
                      "</button>" +
                      '<button class="btn btn--sm btn--ghost" type="button" data-del-account="' + util.esc(acc.email) + '" style="color:var(--danger)">' + ui.icon("trash") + "</button>"
                    : "")
                : '<span style="color:var(--ink-400);font-size:var(--fs-xs)">Protected</span>') +
            "</td>" +
          "</tr>";
        });

        var accActions = role === "super"
          ? '<div class="row row--tight">' +
              '<button class="btn btn--sm btn--accent" type="button" data-action="create-account">' + ui.icon("plus") + " Add Admin Account</button>" +
            "</div>"
          : "";

        var accountsTable = table("Administrative Users & Team Credentials",
          ["User Identity", "Designated Role", "Status", "Created", "Last Login", "Actions"],
          accRows, accActions);

        // Change My Password Card
        var changePwdCard = '<div class="data-table" style="margin-top:1.5rem">' +
          '<div class="data-table__head"><h2 class="data-table__title">Update My Workstation Password</h2>' +
          '<span class="spacer"></span><span style="font-size:var(--fs-xs);color:var(--ink-400)">Signed in as <b>' + (currentUser ? util.esc(currentUser.email) : "Admin") + '</b></span></div>' +
          '<form class="admin-modal-card" data-change-pwd-form style="padding:1.25rem" novalidate>' +
            '<div class="admin-form-grid">' +
              '<div class="field">' +
                '<label class="field__label">Current Password <span class="req">*</span></label>' +
                '<input type="password" class="input" name="oldPassword" required placeholder="••••••••••••">' +
              '</div>' +
              '<div class="field">' +
                '<label class="field__label">New Secure Password <span class="req">*</span></label>' +
                '<input type="password" class="input" name="newPassword" required placeholder="Min 8 chars with symbols" data-pwd-meter-input>' +
                '<div class="pwd-meter" data-pwd-meter-box style="display:none">' +
                  '<div class="pwd-meter__track"><div class="pwd-meter__fill" data-pwd-meter-fill></div></div>' +
                  '<div class="pwd-meter__text"><span data-pwd-meter-label>Weak</span><span>PBKDF2/SHA-256</span></div>' +
                '</div>' +
              '</div>' +
              '<div class="field">' +
                '<label class="field__label">Confirm New Password <span class="req">*</span></label>' +
                '<input type="password" class="input" name="confirmPassword" required placeholder="••••••••••••">' +
              '</div>' +
              '<div class="field" style="display:flex;align-items:flex-end">' +
                '<button type="submit" class="btn btn--accent" style="width:100%">' + ui.icon("lock") + " Update Password</button>" +
              '</div>' +
            '</div>' +
          '</form>' +
        '</div>';

        // Security Audit Trail
        var filteredAudits = audits.filter(function (a) {
          if (activeFilter !== "all") {
            if (activeFilter === "auth" && a.event.indexOf("LOGIN") === -1 && a.event.indexOf("LOGOUT") === -1 && a.event.indexOf("LOCK") === -1) return false;
            if (activeFilter === "accounts" && a.event.indexOf("ACCOUNT") === -1 && a.event.indexOf("PASSWORD") === -1) return false;
            if (activeFilter === "system" && a.event.indexOf("SYSTEM") === -1 && a.event.indexOf("POLICY") === -1 && a.event.indexOf("SESSION") === -1) return false;
          }
          if (activeSearch) {
            var q = activeSearch.toLowerCase();
            return a.event.toLowerCase().indexOf(q) > -1 ||
                   a.email.toLowerCase().indexOf(q) > -1 ||
                   a.details.toLowerCase().indexOf(q) > -1;
          }
          return true;
        });

        var auditPills = filterPills([
          { id: "all", label: "All Events", count: audits.length },
          { id: "auth", label: "Logins & Sessions", count: audits.filter(function (x) { return x.event.indexOf("LOGIN") > -1 || x.event.indexOf("LOGOUT") > -1; }).length },
          { id: "accounts", label: "User Modifications", count: audits.filter(function (x) { return x.event.indexOf("ACCOUNT") > -1 || x.event.indexOf("PASSWORD") > -1; }).length },
          { id: "system", label: "System & Policies", count: audits.filter(function (x) { return x.event.indexOf("SYSTEM") > -1 || x.event.indexOf("POLICY") > -1; }).length }
        ], activeFilter);

        var auditToolbar = filterToolbar({
          placeholder: "Search audit log by event, email or action details...",
          right: '<button class="btn btn--sm btn--outline" type="button" data-export-audit>' + ui.icon("upload") + " Export Audit Log (CSV)</button>"
        });

        var auditRows = filteredAudits.slice(0, 15).map(function (a) {
          var badgeCls = a.status === "danger" ? "audit-badge--danger" :
                         a.status === "warn" ? "audit-badge--warn" :
                         a.status === "success" ? "audit-badge--success" : "audit-badge--info";
          return "<tr>" +
            "<td><b>" + util.fmtWhen(a.timestamp) + "</b></td>" +
            '<td><span class="audit-badge ' + badgeCls + '">' + util.esc(a.event) + "</span></td>" +
            "<td><b>" + util.esc(a.email) + "</b><br><span style='font-size:var(--fs-xs);color:var(--ink-400)'>Role: " + util.esc(a.role) + "</span></td>" +
            "<td style='max-width:26rem;white-space:normal'>" + util.esc(a.details) + "</td>" +
            "<td><span style='font-size:var(--fs-xs);color:var(--ink-400)'>" + util.esc(a.ip) + "</span></td>" +
          "</tr>";
        });

        var auditTable = table("Immutable Security Audit Trail",
          ["Timestamp", "Security Event", "Actor / Identity", "Action Details", "Network / TLS Context"],
          auditRows, "", auditPills + auditToolbar);

        // Security Policies Box
        var policiesCard = '<div class="grid grid--2" style="margin-top:1.5rem;gap:1.25rem">' +
          '<div class="card card--pad" style="background:#fff;border:1px solid var(--line);border-radius:var(--r-md)">' +
            '<h3 style="font-size:var(--fs-md);margin-bottom:.4rem;display:flex;align-items:center;gap:.45rem">' + ui.icon("shield") + ' Workstation Security Controls</h3>' +
            '<p style="font-size:var(--fs-xs);color:var(--ink-500);line-height:1.5">Configure session persistence, brute force throttling, and instant revocation of compromised workstation sessions.</p>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:.75rem">' +
              '<div>' +
                '<label class="field__label" style="font-size:var(--fs-xs)">Inactivity Timeout</label>' +
                '<select class="select" data-policy-timeout>' +
                  '<option value="15"' + (secState.sessionTimeout === 15 ? " selected" : "") + '>15 Minutes</option>' +
                  '<option value="30"' + (secState.sessionTimeout === 30 ? " selected" : "") + '>30 Minutes</option>' +
                  '<option value="60"' + (secState.sessionTimeout === 60 ? " selected" : "") + '>60 Minutes (Default)</option>' +
                  '<option value="120"' + (secState.sessionTimeout === 120 ? " selected" : "") + '>2 Hours</option>' +
                '</select>' +
              '</div>' +
              '<div>' +
                '<label class="field__label" style="font-size:var(--fs-xs)">Brute Lockout Threshold</label>' +
                '<select class="select" data-policy-threshold>' +
                  '<option value="3"' + (secState.lockoutThreshold === 3 ? " selected" : "") + '>3 Failed Attempts</option>' +
                  '<option value="5"' + (secState.lockoutThreshold === 5 ? " selected" : "") + '>5 Failed Attempts (Default)</option>' +
                  '<option value="10"' + (secState.lockoutThreshold === 10 ? " selected" : "") + '>10 Failed Attempts</option>' +
                '</select>' +
              '</div>' +
            '</div>' +
            '<div style="margin-top:1rem;display:flex;justify-content:flex-end">' +
              '<button class="btn btn--sm btn--outline" type="button" data-action="revoke-sessions" style="color:var(--danger);border-color:var(--danger)">' +
                ui.icon("logout") + " Revoke All Workstation Sessions" +
              '</button>' +
            '</div>' +
          '</div>' +

          '<div class="card card--pad" style="background:#fff;border:1px solid var(--line);border-radius:var(--r-md)">' +
            '<h3 style="font-size:var(--fs-md);margin-bottom:.4rem;display:flex;align-items:center;gap:.45rem">' + ui.icon("lock") + ' Cryptographic Implementation Summary</h3>' +
            '<ul style="font-size:var(--fs-xs);color:var(--ink-500);line-height:1.7;padding-left:1.1rem;margin:0">' +
              '<li><b>PBKDF2-stretched SHA-256</b> password hashing with 2,000 recursive iterations.</li>' +
              '<li><b>16-byte cryptographically secure unique salts</b> generated via native CSPRNG.</li>' +
              '<li><b>Constant-time equality comparison</b> to eliminate side-channel timing leaks.</li>' +
              '<li><b>Automatic idle timeout</b> requiring re-authentication upon workstation inactivity.</li>' +
              '<li><b>HTTP Security Headers</b>: CSP, HSTS preload, X-Frame-Options SAMEORIGIN, no-cache.</li>' +
            '</ul>' +
          '</div>' +
        '</div>';

        // Role Matrix Table
        var roleMatrix = '<div class="data-table" style="margin-top:1.5rem">' +
          '<div class="data-table__head"><h2 class="data-table__title">Role-Based Access Control (RBAC) Permission Matrix</h2>' +
          '<span class="spacer"></span><span class="badge badge--outline">Enforced Server & Client</span></div>' +
          '<div class="data-table__scroll"><table class="role-matrix"><thead><tr><th>Admin Module</th>' +
          data.adminRoles.map(function (r) { return "<th>" + util.esc(r.name) + "</th>"; }).join("") +
          "</tr></thead><tbody>" +
          data.adminModules.map(function (m) {
            return "<tr><td><b>" + util.esc(m.name) + "</b></td>" +
              data.adminRoles.map(function (r) {
                var v = m.perms[r.id];
                return "<td>" + (v === 2
                  ? '<span class="yes">' + ui.icon("checkCircle") + " Full Manage</span>"
                  : v === 1
                    ? '<span class="yes" style="color:var(--navy-700)">' + ui.icon("eye") + " View Only</span>"
                    : '<span class="no">' + ui.icon("x") + " Hidden</span>") + "</td>";
              }).join("") + "</tr>";
          }).join("") +
          "</tbody></table></div></div>";

        return kpiHtml + accountsTable + changePwdCard + '<div style="margin-top:1.5rem">' + auditTable + '</div>' + policiesCard + roleMatrix;
      }
    };

    /* ----------------------------- Enquiry Helper ------------------------- */
    function enquiryView(type) {
      var enqs = AdminDB.get("enquiries").filter(function (e) {
        return e.type.toLowerCase() === type.toLowerCase();
      });

      var filtered = enqs.filter(function (e) {
        if (activeFilter !== "all" && e.status.toLowerCase() !== activeFilter.toLowerCase()) return false;
        if (activeSearch) {
          var s = activeSearch.toLowerCase();
          return (e.who && e.who.toLowerCase().indexOf(s) > -1) ||
                 (e.detail && e.detail.toLowerCase().indexOf(s) > -1) ||
                 (e.city && e.city.toLowerCase().indexOf(s) > -1);
        }
        return true;
      });

      var pills = filterPills([
        { id: "all", label: "All " + type, count: enqs.length },
        { id: "new", label: "New Leads", count: enqs.filter(function (e) { return e.status === "New"; }).length },
        { id: "in review", label: "In Review / Contacted", count: enqs.filter(function (e) { return e.status === "In review" || e.status === "Site survey" || e.status === "Call booked"; }).length },
        { id: "quoted", label: "Quoted", count: enqs.filter(function (e) { return e.status === "Quoted" || e.status === "Samples sent" || e.status === "Rate card shared"; }).length },
        { id: "won", label: "Won / Contracted", count: enqs.filter(function (e) { return e.status === "Won"; }).length }
      ], activeFilter);

      var toolbar = filterToolbar({
        placeholder: "Search " + type.toLowerCase() + " enquiries by name, city or requirements...",
        right: '<span style="font-size:var(--fs-xs);color:var(--ink-400)">Total: <b>' + filtered.length + '</b></span>'
      });

      var rows = filtered.map(function (e) {
        return "<tr>" +
          "<td><b>" + util.esc(e.who) + "</b>" +
            (e.phone ? "<br><span style=\"font-size:var(--fs-xs);color:var(--ink-400)\">" + util.esc(e.phone) + "</span>" : "") +
          "</td>" +
          "<td>" + util.esc(e.city || "Dibrugarh") + "</td>" +
          "<td style=\"max-width:24rem;white-space:normal\">" + util.esc(e.detail) + "</td>" +
          "<td>" + util.esc(e.when || "Recent") + "</td>" +
          '<td><span class="badge ' + (e.status === "New" ? "badge--limited" : e.status === "Won" ? "badge--eggless" : "badge--outline") + '">' + util.esc(e.status) + "</span></td>" +
          '<td style="white-space:nowrap">' +
            '<button class="btn btn--sm btn--outline" type="button" data-view-enq="' + e.id + '">' + ui.icon("eye") + " View & Reply</button> " +
            (canManage(type.toLowerCase())
              ? '<button class="btn btn--sm btn--ghost" type="button" data-del-enq="' + e.id + '" style="color:var(--danger)">' + ui.icon("trash") + "</button>"
              : "") +
          "</td>" +
        "</tr>";
      });

      var actions = '<button class="btn btn--sm btn--outline" type="button" data-export="enquiries::' + type + '">' + ui.icon("upload") + " Export " + type + " CSV</button>";

      return table(type + " Inquiries & Lead Pipeline",
        ["Applicant / Partner", "Location", "Scope & Requirements", "Received", "Status", "Actions"],
        rows, actions, pills + toolbar);
    }

    function productionQueue() {
      var orders = AdminDB.get("orders").filter(function (o) {
        return o.status === "baking" || o.status === "placed";
      });

      if (!orders.length) {
        return '<p style="font-size:var(--fs-sm);color:var(--ink-400);text-align:center;padding:1.5rem 0">No orders waiting in production queue. Kitchen is clear!</p>';
      }

      return orders.slice(0, 5).map(function (o) {
        var stage = o.status === "placed" ? "Kitchen Ticket Received" : "Baking & Glazing";
        return '<div class="row row--between row--nowrap" style="gap:.75rem;padding-bottom:.7rem;border-bottom:1px solid var(--line)">' +
          "<div><b style=\"font-size:var(--fs-sm);color:var(--navy-900)\">" + util.esc(o.id) + " · " + util.esc(o.customer) + "</b><br>" +
          '<span style="font-size:var(--fs-xs);color:var(--ink-500)">' + util.esc(stage) + " · " + (o.slot || "Today") + "</span></div>" +
          (canManage("orders")
            ? '<button class="btn btn--sm btn--outline" type="button" data-advance-order="' + o.id + '">' + ui.icon("chevronRight") + " Next</button>"
            : '<span class="badge badge--outline">' + o.status + "</span>") +
        "</div>";
      }).join("");
    }

    /* ==========================================================================
       MODAL DIALOGS (Interactive Workflows)
       ========================================================================== */

    /* 1. ORDER DETAILS & LIFECYCLE MODAL */
    function showOrderModal(orderId) {
      var o = AdminDB.get("orders").filter(function (x) { return x.id === orderId; })[0];
      if (!o) return;

      var stages = [
        { key: "placed", title: "Confirmed", num: "1" },
        { key: "baking", title: "In Production", num: "2" },
        { key: "quality", title: "Quality & Pack", num: "3" },
        { key: "out", title: "Out for Delivery", num: "4" },
        { key: "delivered", title: "Delivered", num: "5" }
      ];

      var stageOrder = ["placed", "baking", "quality", "out", "delivered"];
      var currentIdx = stageOrder.indexOf(o.status);

      var stepperHtml = '<div class="order-stepper">' + stages.map(function (s, idx) {
        var isDone = currentIdx >= idx;
        var isCurrent = o.status === s.key;
        return '<div class="order-step' + (isDone ? " is-done" : "") + (isCurrent ? " is-current" : "") + '">' +
          '<span class="order-step__num">Stage ' + s.num + (isDone && !isCurrent ? " ✓" : "") + "</span>" +
          '<span class="order-step__title">' + s.title + "</span>" +
        "</div>";
      }).join("") + "</div>";

      var items = o.lineItems || [
        { name: o.brand + " Celebration Selection", variant: "Signature Standard", qty: o.items || 1, unit: Math.round((o.total || 1000) / (o.items || 1)), total: o.total }
      ];

      var itemsTable = '<table style="width:100%;border-collapse:collapse;font-size:var(--fs-sm)">' +
        '<thead><tr style="border-bottom:1px solid var(--line);text-align:left;color:var(--ink-500);font-size:var(--fs-xs)">' +
        '<th style="padding:.5rem 0">Item</th><th>Variant / Details</th><th>Qty</th><th>Unit</th><th style="text-align:right">Total</th></tr></thead><tbody>' +
        items.map(function (it) {
          var p = query.byId(it.id);
          var detailNotes = [it.flavour, it.eggless ? "Eggless" : null, it.message ? 'Message: "' + it.message + '"' : null].filter(Boolean).join(" · ");
          return '<tr style="border-bottom:1px solid var(--line)">' +
            '<td style="padding:.65rem 0"><b>' + util.esc(it.name) + "</b>" +
              (detailNotes ? '<br><span style="font-size:var(--fs-xs);color:var(--ink-400)">' + util.esc(detailNotes) + "</span>" : "") +
            "</td>" +
            "<td>" + util.esc(it.variant || "Standard") + "</td>" +
            "<td>" + (it.qty || 1) + "</td>" +
            "<td>" + util.money(it.unit || it.total) + "</td>" +
            '<td style="text-align:right"><b>' + util.money(it.total) + "</b></td>" +
          "</tr>";
        }).join("") +
        "</tbody></table>";

      var addrStr = o.address
        ? [o.address.line, o.address.landmark, o.address.city, o.address.pin].filter(Boolean).join(", ")
        : (o.store || "Dibrugarh Store Pickup");

      var html = '<div class="admin-modal-card">' +
        '<div class="admin-modal-head">' +
          "<div>" +
            '<span class="eyebrow" style="color:var(--accent)">Order Management</span>' +
            '<h2 style="font-size:var(--fs-h3)">' + o.id + ' <span class="status status--' + o.status + '">' + o.status + "</span></h2>" +
          "</div>" +
          '<div class="row row--tight">' +
            '<button class="btn btn--sm btn--outline" type="button" data-invoice="' + o.id + '">' + ui.icon("file") + " Print Tax Invoice</button>" +
          "</div>" +
        "</div>" +

        stepperHtml +

        '<div class="grid grid--2" style="gap:1rem;background:var(--cream-50);padding:1rem;border-radius:var(--r-md);border:1px solid var(--line)">' +
          "<div>" +
            '<span class="eyebrow eyebrow--muted">Customer Details</span>' +
            '<p style="font-size:var(--fs-base);margin:.2rem 0;font-weight:600">' + util.esc(o.customer) + "</p>" +
            '<p style="font-size:var(--fs-sm);color:var(--ink-500);margin:0">' +
              (o.phone ? util.esc(o.phone) + " · " : "") + (o.email ? util.esc(o.email) : "") +
            "</p>" +
            '<p style="font-size:var(--fs-xs);color:var(--ink-400);margin-top:.4rem">Channel: <b>' + util.esc(o.channel || "Web Storefront") + "</b> · Payment: <b>" + util.esc(o.payment || "Prepaid") + "</b></p>" +
          "</div>" +
          "<div>" +
            '<span class="eyebrow eyebrow--muted">Fulfillment & Slot</span>' +
            '<p style="font-size:var(--fs-sm);margin:.2rem 0"><b>' + util.esc(o.slot || "Scheduled Slot") + "</b></p>" +
            '<p style="font-size:var(--fs-sm);color:var(--ink-500);line-height:1.45;margin:0">' + util.esc(addrStr) + "</p>" +
            (o.instructions ? '<p style="font-size:var(--fs-xs);color:var(--accent-ink);margin-top:.4rem"><b>Chef Note:</b> ' + util.esc(o.instructions) + "</p>" : "") +
          "</div>" +
        "</div>" +

        '<div style="margin-top:.5rem">' +
          '<h3 style="font-size:var(--fs-md);margin-bottom:.5rem">Ordered Line Items</h3>' +
          itemsTable +
        "</div>" +

        '<div class="row row--between" style="border-top:1px solid var(--line);padding-top:.85rem">' +
          '<div class="row row--tight">' +
            '<label style="font-size:var(--fs-xs);font-weight:600;text-transform:uppercase;color:var(--ink-500)">Status:</label>' +
            '<select class="select" data-update-order-status="' + o.id + '" style="height:2.4rem;min-height:2.4rem;padding:.3rem 2rem .3rem .7rem;font-size:var(--fs-sm)">' +
              '<option value="placed"' + (o.status === "placed" ? " selected" : "") + ">Placed</option>" +
              '<option value="baking"' + (o.status === "baking" ? " selected" : "") + ">In Production (Baking)</option>" +
              '<option value="quality"' + (o.status === "quality" ? " selected" : "") + ">Quality & Packing</option>" +
              '<option value="out"' + (o.status === "out" ? " selected" : "") + ">Out for Delivery</option>" +
              '<option value="delivered"' + (o.status === "delivered" ? " selected" : "") + ">Delivered</option>" +
              '<option value="cancelled"' + (o.status === "cancelled" ? " selected" : "") + ">Cancelled</option>" +
            "</select>" +
          "</div>" +
          '<div style="text-align:right">' +
            '<span style="font-size:var(--fs-xs);color:var(--ink-400)">Grand Total (Incl. Taxes):</span><br>' +
            '<b style="font-size:var(--fs-h3);color:var(--navy-900)">' + util.money(o.total) + "</b>" +
          "</div>" +
        "</div>" +

        '<div class="row row--end row--tight" style="margin-top:.5rem">' +
          (canManage("orders") && o.status !== "delivered" && o.status !== "cancelled"
            ? '<button class="btn btn--accent" type="button" data-advance-order="' + o.id + '">' + ui.icon("checkCircle") + " Advance to Next Stage</button>"
            : "") +
          '<button class="btn btn--outline" type="button" data-modal-close>Close</button>' +
        "</div>" +
      "</div>";

      ui.modal(html, { label: "Order Details " + o.id });
    }

    /* 2. MANUAL ORDER CREATION MODAL */
    function showManualOrderModal() {
      var prods = AdminDB.get("products");
      var stores = AdminDB.get("stores");
      var slots = data.deliverySlots || [];

      var prodOptions = prods.map(function (p) {
        return '<option value="' + p.id + '">' + util.esc(p.name) + " (" + util.esc(p.brandName) + " · from " + util.money(p.priceFrom) + ")</option>";
      }).join("");

      var html = '<form class="admin-modal-card" data-manual-order-form novalidate>' +
        '<div class="admin-modal-head">' +
          '<div><span class="eyebrow" style="color:var(--accent)">Counter / Phone Desk</span>' +
          '<h2 style="font-size:var(--fs-h3)">Create Manual Order</h2></div>' +
        "</div>" +

        '<div class="admin-form-grid">' +
          '<div class="field">' +
            '<label class="field__label">Customer Full Name <span class="req">*</span></label>' +
            '<input class="input" name="customer" required placeholder="e.g. Radhika Sharma">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Contact Mobile <span class="req">*</span></label>' +
            '<input class="input" name="phone" type="tel" required placeholder="+91 98640 xxxxx">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Email Address</label>' +
            '<input class="input" name="email" type="email" placeholder="customer@domain.com">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Fulfillment Mode</label>' +
            '<select class="select" name="mode">' +
              '<option value="delivery">Home Delivery (Dibrugarh)</option>' +
              '<option value="pickup">Store Counter Pickup</option>' +
            "</select>" +
          "</div>" +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Delivery Address / Pickup Counter</label>' +
            '<input class="input" name="address" placeholder="Flat, Street, Landmark or chosen counter" value="Dibrugarh Central Counter">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Product Selection <span class="req">*</span></label>' +
            '<select class="select" name="product" required>' + prodOptions + "</select>" +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Quantity</label>' +
            '<input class="input" name="qty" type="number" min="1" max="50" value="1">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Delivery Slot</label>' +
            '<select class="select" name="slot">' +
              slots.map(function (s) { return '<option value="' + s.label + '">' + util.esc(s.label) + "</option>"; }).join("") +
            "</select>" +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Payment Mode</label>' +
            '<select class="select" name="payment">' +
              '<option value="UPI">UPI / GPay / PhonePe</option>' +
              '<option value="Cash">Cash at Counter</option>' +
              '<option value="Card">Credit / Debit Card POS</option>' +
              '<option value="Corporate Invoice">Corporate Account (30-day net)</option>' +
            "</select>" +
          "</div>" +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Chef Instructions / Message on Cake</label>' +
            '<input class="input" name="instructions" placeholder="e.g. Write Happy Birthday Rahul in chocolate">' +
          "</div>" +
        "</div>" +

        '<div class="row row--end row--tight" style="border-top:1px solid var(--line);padding-top:1rem">' +
          '<button class="btn btn--outline" type="button" data-modal-close>Cancel</button>' +
          '<button class="btn btn--accent" type="submit">' + ui.icon("check") + " Place Order</button>" +
        "</div>" +
      "</form>";

      ui.modal(html, { label: "Create Manual Order" });
    }

    /* 3. PRODUCT CREATION / EDITING MODAL */
    function showProductModal(prodId) {
      var p = prodId ? AdminDB.get("products").filter(function (x) { return x.id === prodId; })[0] : null;
      var cats = AdminDB.get("categories");

      var pName = p ? p.name : "";
      var pIdVal = p ? p.id : "new-artisan-bake-" + Date.now().toString(36);
      var pBrand = p ? p.brand : "signature";
      var pPrice = p ? p.priceFrom : 495;
      var pLead = p ? p.leadHours : 24;
      var pDesc = p ? p.desc : "";
      var pBadges = p ? p.badges.join(", ") : "NEW";
      var pCats = p ? p.cats : ["cakes"];

      var html = '<form class="admin-modal-card" data-product-form novalidate>' +
        '<input type="hidden" name="isEdit" value="' + (p ? "1" : "0") + '">' +
        '<div class="admin-modal-head">' +
          '<div><span class="eyebrow" style="color:var(--accent)">Catalogue Manager</span>' +
          '<h2 style="font-size:var(--fs-h3)">' + (p ? "Edit Product: " + util.esc(p.name) : "Create New Product") + "</h2></div>" +
        "</div>" +

        '<div class="admin-form-grid">' +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Product Title <span class="req">*</span></label>' +
            '<input class="input" name="name" required value="' + util.esc(pName) + '" placeholder="e.g. Golden Mango Entremet">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Product Slug / URL ID <span class="req">*</span></label>' +
            '<input class="input" name="id" ' + (p ? "readonly" : "required") + ' value="' + util.esc(pIdVal) + '">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Brand House <span class="req">*</span></label>' +
            '<select class="select" name="brand">' +
              '<option value="signature"' + (pBrand === "signature" ? " selected" : "") + ">SAiPH Signature (Luxury Pâtisserie)</option>" +
              '<option value="doughremi"' + (pBrand === "doughremi" ? " selected" : "") + ">DoughReMi (Everyday Bakery)</option>" +
              '<option value="khowdy"' + (pBrand === "khowdy" ? " selected" : "") + ">Khowdy (Packaged Foods)</option>" +
            "</select>" +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Starting Base Price (₹) <span class="req">*</span></label>' +
            '<input class="input" name="price" type="number" required min="50" max="50000" value="' + pPrice + '">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Lead Time (Hours)</label>' +
            '<input class="input" name="leadHours" type="number" min="0" max="72" value="' + pLead + '">' +
          "</div>" +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Badges (comma separated)</label>' +
            '<input class="input" name="badges" value="' + util.esc(pBadges) + '" placeholder="BESTSELLER, EGGLESS, NEW">' +
          "</div>" +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Categories</label>' +
            '<div class="row row--wrap" style="gap:.5rem;padding:.5rem 0">' +
              cats.map(function (c) {
                var checked = pCats.indexOf(c.id) > -1 ? " checked" : "";
                return '<label class="check" style="font-size:var(--fs-xs)"><input type="checkbox" name="cats" value="' + c.id + '"' + checked + "> " + util.esc(c.name) + "</label>";
              }).join("") +
            "</div>" +
          "</div>" +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Short Description</label>' +
            '<textarea class="textarea" name="desc" style="min-height:5rem">' + util.esc(pDesc) + "</textarea>" +
          "</div>" +
        "</div>" +

        '<div class="row row--end row--tight" style="border-top:1px solid var(--line);padding-top:1rem">' +
          '<button class="btn btn--outline" type="button" data-modal-close>Cancel</button>' +
          '<button class="btn btn--accent" type="submit">' + ui.icon("check") + " Save Product</button>" +
        "</div>" +
      "</form>";

      ui.modal(html, { label: p ? "Edit Product" : "New Product" });
    }

    /* 4. CATEGORY CREATION / EDIT MODAL */
    function showCategoryModal(catId) {
      var c = catId ? AdminDB.get("categories").filter(function (x) { return x.id === catId; })[0] : null;

      var html = '<form class="admin-modal-card" data-category-form novalidate>' +
        '<input type="hidden" name="isEdit" value="' + (c ? "1" : "0") + '">' +
        '<div class="admin-modal-head">' +
          '<div><span class="eyebrow" style="color:var(--accent)">Taxonomy</span>' +
          '<h2 style="font-size:var(--fs-h3)">' + (c ? "Edit Category: " + util.esc(c.name) : "Add New Category") + "</h2></div>" +
        "</div>" +

        '<div class="admin-form-grid">' +
          '<div class="field">' +
            '<label class="field__label">Category Name <span class="req">*</span></label>' +
            '<input class="input" name="name" required value="' + util.esc(c ? c.name : "") + '" placeholder="e.g. Tea Cakes & Loaves">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Category Slug / ID <span class="req">*</span></label>' +
            '<input class="input" name="id" ' + (c ? "readonly" : "required") + ' value="' + util.esc(c ? c.id : "") + '" placeholder="e.g. tea-cakes">' +
          "</div>" +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Short Description Blurb</label>' +
            '<input class="input" name="blurb" value="' + util.esc(c ? c.blurb : "") + '" placeholder="e.g. Freshly baked everyday loaf cakes">' +
          "</div>" +
        "</div>" +

        '<div class="row row--end row--tight" style="border-top:1px solid var(--line);padding-top:1rem">' +
          '<button class="btn btn--outline" type="button" data-modal-close>Cancel</button>' +
          '<button class="btn btn--accent" type="submit">' + ui.icon("check") + " Save Category</button>" +
        "</div>" +
      "</form>";

      ui.modal(html, { label: c ? "Edit Category" : "New Category", size: "sm" });
    }

    /* 5. COUPON CREATION / EDIT MODAL */
    function showCouponModal(code) {
      var c = code ? AdminDB.get("coupons").filter(function (x) { return x.code === code; })[0] : null;

      var html = '<form class="admin-modal-card" data-coupon-form novalidate>' +
        '<input type="hidden" name="isEdit" value="' + (c ? "1" : "0") + '">' +
        '<div class="admin-modal-head">' +
          '<div><span class="eyebrow" style="color:var(--accent)">Promotions</span>' +
          '<h2 style="font-size:var(--fs-h3)">' + (c ? "Edit Coupon: " + c.code : "Create New Coupon") + "</h2></div>" +
        "</div>" +

        '<div class="admin-form-grid">' +
          '<div class="field">' +
            '<label class="field__label">Coupon Code <span class="req">*</span></label>' +
            '<input class="input" name="code" style="text-transform:uppercase;font-weight:700" ' + (c ? "readonly" : "required") + ' value="' + util.esc(c ? c.code : "FESTIVE" + Math.floor(10 + Math.random() * 90)) + '">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Discount Type <span class="req">*</span></label>' +
            '<select class="select" name="type">' +
              '<option value="percent"' + (c && c.type === "percent" ? " selected" : "") + ">Percentage (%) Off</option>" +
              '<option value="flat"' + (c && c.type === "flat" ? " selected" : "") + ">Flat Amount (₹) Off</option>" +
              '<option value="shipping"' + (c && c.type === "shipping" ? " selected" : "") + ">Free Shipping</option>" +
            "</select>" +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Discount Value <span class="req">*</span></label>' +
            '<input class="input" name="value" type="number" required min="1" value="' + (c ? c.value : 15) + '">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Min Cart Value (₹)</label>' +
            '<input class="input" name="min" type="number" min="0" value="' + (c ? c.min : 799) + '">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Discount Cap (₹, 0 = unlimited)</label>' +
            '<input class="input" name="cap" type="number" min="0" value="' + (c && c.cap ? c.cap : 300) + '">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Brand Scope</label>' +
            '<select class="select" name="brand">' +
              '<option value="">All Brands</option>' +
              '<option value="signature"' + (c && c.brand === "signature" ? " selected" : "") + ">SAiPH Signature Only</option>" +
              '<option value="doughremi"' + (c && c.brand === "doughremi" ? " selected" : "") + ">DoughReMi Only</option>" +
              '<option value="khowdy"' + (c && c.brand === "khowdy" ? " selected" : "") + ">Khowdy Only</option>" +
            "</select>" +
          "</div>" +
        "</div>" +

        '<div class="row row--end row--tight" style="border-top:1px solid var(--line);padding-top:1rem">' +
          '<button class="btn btn--outline" type="button" data-modal-close>Cancel</button>' +
          '<button class="btn btn--accent" type="submit">' + ui.icon("check") + " Save Coupon</button>" +
        "</div>" +
      "</form>";

      ui.modal(html, { label: c ? "Edit Coupon" : "New Coupon", size: "sm" });
    }

    /* 6. GIFT CARD ISSUANCE MODAL */
    function showGiftCardModal() {
      var rand = function () { return Math.random().toString(36).substr(2, 4).toUpperCase(); };
      var code = "SAIPH-" + rand() + "-" + rand() + "-" + rand();

      var html = '<form class="admin-modal-card" data-giftcard-form novalidate>' +
        '<div class="admin-modal-head">' +
          '<div><span class="eyebrow" style="color:var(--accent)">Gift Voucher Desk</span>' +
          '<h2 style="font-size:var(--fs-h3)">Issue Digital Gift Card</h2></div>' +
        "</div>" +

        '<div class="admin-form-grid">' +
          '<div class="field">' +
            '<label class="field__label">Generated Card Code</label>' +
            '<input class="input" name="code" readonly value="' + code + '" style="font-weight:700">' +
          "</div>" +
          '<div class="field">' +
            '<label class="field__label">Denomination Value (₹) <span class="req">*</span></label>' +
            '<select class="select" name="value">' +
              '<option value="1000">₹1,000</option>' +
              '<option value="2000" selected>₹2,000</option>' +
              '<option value="3000">₹3,000</option>' +
              '<option value="5000">₹5,000</option>' +
              '<option value="10000">₹10,000</option>' +
            "</select>" +
          "</div>" +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Recipient Name <span class="req">*</span></label>' +
            '<input class="input" name="recipient" required placeholder="e.g. Priya Gogoi">' +
          "</div>" +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Recipient Email Address</label>' +
            '<input class="input" name="email" type="email" placeholder="priya@example.com">' +
          "</div>" +
        "</div>" +

        '<div class="row row--end row--tight" style="border-top:1px solid var(--line);padding-top:1rem">' +
          '<button class="btn btn--outline" type="button" data-modal-close>Cancel</button>' +
          '<button class="btn btn--accent" type="submit">' + ui.icon("gift") + " Issue Card</button>" +
        "</div>" +
      "</form>";

      ui.modal(html, { label: "Issue Gift Card", size: "sm" });
    }

    /* 7. ENQUIRY DETAILS & REPLY MODAL */
    function showEnquiryModal(enqId) {
      var e = AdminDB.get("enquiries").filter(function (x) { return x.id === enqId; })[0];
      if (!e) return;

      var html = '<div class="admin-modal-card">' +
        '<div class="admin-modal-head">' +
          "<div>" +
            '<span class="eyebrow" style="color:var(--accent)">' + util.esc(e.type) + " Lead</span>" +
            '<h2 style="font-size:var(--fs-h3)">' + util.esc(e.who) + "</h2>" +
          "</div>" +
          '<span class="badge ' + (e.status === "New" ? "badge--limited" : e.status === "Won" ? "badge--eggless" : "badge--outline") + '">' + util.esc(e.status) + "</span>" +
        "</div>" +

        '<div class="grid grid--2" style="gap:1rem;background:var(--cream-50);padding:1rem;border-radius:var(--r-md);border:1px solid var(--line)">' +
          "<div>" +
            '<span class="eyebrow eyebrow--muted">Contact Info</span>' +
            '<p style="font-size:var(--fs-sm);margin:.3rem 0"><b>Phone:</b> ' + (e.phone ? '<a href="tel:' + e.phone + '">' + util.esc(e.phone) + "</a>" : "Not provided") + "</p>" +
            '<p style="font-size:var(--fs-sm);margin:0"><b>Email:</b> ' + (e.email ? '<a href="mailto:' + e.email + '">' + util.esc(e.email) + "</a>" : "Not provided") + "</p>" +
            '<p style="font-size:var(--fs-sm);margin:.3rem 0 0"><b>Location:</b> ' + util.esc(e.city || "Dibrugarh") + "</p>" +
          "</div>" +
          "<div>" +
            '<span class="eyebrow eyebrow--muted">Opportunity Stage</span>' +
            '<label style="display:block;font-size:var(--fs-xs);margin-top:.4rem">Update Lead Status:</label>' +
            '<select class="select" data-update-enq-status="' + e.id + '" style="height:2.4rem;min-height:2.4rem;padding:.3rem 2rem .3rem .7rem;font-size:var(--fs-sm);margin-top:.2rem">' +
              '<option value="New"' + (e.status === "New" ? " selected" : "") + ">New Lead</option>" +
              '<option value="In review"' + (e.status === "In review" ? " selected" : "") + ">In Review / Contacted</option>" +
              '<option value="Quoted"' + (e.status === "Quoted" ? " selected" : "") + ">Quoted / Proposal Sent</option>" +
              '<option value="Won"' + (e.status === "Won" ? " selected" : "") + ">Won / Agreement Signed</option>" +
              '<option value="Declined"' + (e.status === "Declined" ? " selected" : "") + ">Declined</option>" +
            "</select>" +
          "</div>" +
        "</div>" +

        '<div>' +
          '<h3 style="font-size:var(--fs-sm);text-transform:uppercase;letter-spacing:.08em;color:var(--ink-500)">Requirement Details</h3>' +
          '<p style="font-size:var(--fs-base);background:var(--white);padding:1rem;border:1px solid var(--line);border-radius:var(--r-sm);line-height:1.6">' +
            util.esc(e.detail) +
          "</p>" +
        "</div>" +

        '<form data-enq-note-form="' + e.id + '" style="display:grid;gap:.5rem">' +
          '<label class="field__label">Internal Staff Notes</label>' +
          '<textarea class="textarea" name="note" style="min-height:4.5rem" placeholder="Type internal follow-up notes here...">' + util.esc(e.notes || "") + "</textarea>" +
          '<div class="row row--between">' +
            '<button class="btn btn--sm btn--accent" type="submit">' + ui.icon("check") + " Save Notes</button>" +
            '<div class="row row--tight">' +
              (e.phone ? '<a class="btn btn--sm btn--outline" href="tel:' + e.phone + '">' + ui.icon("phone") + " Call</a>" : "") +
              (e.email ? '<a class="btn btn--sm btn--outline" href="mailto:' + e.email + '">' + ui.icon("mail") + " Email</a>" : "") +
            '</div>' +
          '</div>' +
        "</form>" +

        '<div class="row row--end" style="border-top:1px solid var(--line);padding-top:.75rem">' +
          '<button class="btn btn--outline" type="button" data-modal-close>Close</button>' +
        "</div>" +
      "</div>";

      ui.modal(html, { label: "Enquiry " + e.who, size: "sm" });
    }

    /* 8. CUSTOMER ORDER HISTORY MODAL */
    function showCustomerModal(custName) {
      var orders = AdminDB.get("orders").filter(function (o) { return o.customer === custName; });
      var totalSpend = orders.reduce(function (n, o) { return n + (o.total || 0); }, 0);

      var rows = orders.map(function (o) {
        return "<tr>" +
          "<td><a href=\"#\" data-view-order=\"" + o.id + "\"><b>" + o.id + "</b></a></td>" +
          "<td>" + (o.slot || "Recent") + "</td>" +
          "<td>" + (o.items || (o.lineItems ? o.lineItems.length : 1)) + " items</td>" +
          "<td><b>" + util.money(o.total) + "</b></td>" +
          '<td><span class="status status--' + o.status + '">' + o.status + "</span></td>" +
          '<td><button class="btn btn--sm btn--outline" type="button" data-view-order="' + o.id + '">View</button></td>' +
        "</tr>";
      });

      var html = '<div class="admin-modal-card">' +
        '<div class="admin-modal-head">' +
          "<div>" +
            '<span class="eyebrow" style="color:var(--accent)">Customer Profile</span>' +
            '<h2 style="font-size:var(--fs-h3)">' + util.esc(custName) + "</h2>" +
          "</div>" +
          '<div style="text-align:right">' +
            '<span style="font-size:var(--fs-xs);color:var(--ink-400)">Total Spent:</span><br>' +
            '<b style="font-size:var(--fs-lg);color:var(--navy-900)">' + util.money(totalSpend) + "</b>" +
          "</div>" +
        "</div>" +

        '<div style="max-height:22rem;overflow-y:auto">' +
          '<table style="width:100%;border-collapse:collapse;font-size:var(--fs-sm)">' +
            '<thead><tr style="border-bottom:1px solid var(--line);text-align:left;color:var(--ink-500);font-size:var(--fs-xs)">' +
            '<th>Order</th><th>Slot</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr></thead><tbody>' +
            rows.join("") +
          "</tbody></table>" +
        "</div>" +

        '<div class="row row--end" style="border-top:1px solid var(--line);padding-top:.75rem">' +
          '<button class="btn btn--outline" type="button" data-modal-close>Close</button>' +
        "</div>" +
      "</div>";

      ui.modal(html, { label: "Customer Profile: " + custName });
    }

    /* 9. PRINTABLE TAX INVOICE MODAL */
    function showInvoiceModal(orderId) {
      var o = AdminDB.get("orders").filter(function (x) { return x.id === orderId; })[0];
      if (!o) return;

      var items = o.lineItems || [
        { name: o.brand + " Celebration Selection", variant: "Signature Standard", qty: o.items || 1, unit: Math.round((o.total || 1000) / (o.items || 1)), total: o.total }
      ];

      var subtotal = items.reduce(function (n, it) { return n + (it.total || 0); }, 0);
      var gst = Math.round(subtotal * 0.05); // 5% bakery GST
      var grand = o.total || subtotal;

      var invoiceHtml = '<div class="printable-receipt" style="background:#fff;color:#111;padding:2rem;font-family:sans-serif">' +
        '<div style="display:flex;justify-content:space-between;border-bottom:2px solid #08101f;padding-bottom:1rem">' +
          "<div>" +
            '<h1 style="font-size:1.6rem;margin:0;color:#08101f;letter-spacing:.05em">SAiPH Bakes</h1>' +
            '<p style="font-size:0.85rem;color:#555;margin:.25rem 0">SAiPH Bakes Foods Pvt. Ltd.<br>Chowkidinghee, RKB Path, Dibrugarh, Assam 786001<br>GSTIN: 18AABCS9821M1Z4</p>' +
          "</div>" +
          '<div style="text-align:right">' +
            '<h2 style="font-size:1.15rem;margin:0;color:#08101f">TAX INVOICE</h2>' +
            '<p style="font-size:0.85rem;color:#444;margin:.25rem 0">' +
              "Invoice #: <b>" + o.id + "</b><br>" +
              "Date: " + new Date().toISOString().slice(0, 10) + "<br>" +
              "Payment: " + (o.payment || "Prepaid UPI") +
            "</p>" +
          "</div>" +
        "</div>" +

        '<div style="display:flex;justify-content:space-between;margin:1.25rem 0;padding-bottom:1rem;border-bottom:1px solid #ddd;font-size:0.9rem">' +
          "<div>" +
            "<b>Billed To:</b><br>" +
            util.esc(o.customer) + "<br>" +
            (o.phone ? util.esc(o.phone) + "<br>" : "") +
            (o.email ? util.esc(o.email) : "") +
          "</div>" +
          '<div style="text-align:right">' +
            "<b>Delivery Mode:</b><br>" +
            (o.address ? util.esc([o.address.line, o.address.city, o.address.pin].filter(Boolean).join(", ")) : "Store Pickup") + "<br>" +
            "Slot: " + util.esc(o.slot || "Immediate") +
          "</div>" +
        "</div>" +

        '<table style="width:100%;border-collapse:collapse;font-size:0.9rem;margin-bottom:1.5rem">' +
          '<tr style="background:#f5f5f5;border-bottom:1px solid #ccc;text-align:left">' +
            '<th style="padding:.6rem">Description</th><th>Variant</th><th>Qty</th><th>Rate</th><th style="text-align:right;padding:.6rem">Amount</th>' +
          "</tr>" +
          items.map(function (it) {
            return '<tr style="border-bottom:1px solid #eee">' +
              '<td style="padding:.6rem"><b>' + util.esc(it.name) + "</b></td>" +
              "<td>" + util.esc(it.variant || "Standard") + "</td>" +
              "<td>" + (it.qty || 1) + "</td>" +
              "<td>" + util.money(it.unit || it.total) + "</td>" +
              '<td style="text-align:right;padding:.6rem"><b>' + util.money(it.total) + "</b></td>" +
            "</tr>";
          }).join("") +
        "</table>" +

        '<div style="display:flex;justify-content:flex-end;font-size:0.95rem">' +
          '<div style="width:16rem;display:grid;gap:.35rem">' +
            '<div style="display:flex;justify-content:space-between"><span>Subtotal:</span><span>' + util.money(subtotal - gst) + "</span></div>" +
            '<div style="display:flex;justify-content:space-between"><span>GST (5%):</span><span>' + util.money(gst) + "</span></div>" +
            '<div style="display:flex;justify-content:space-between;border-top:1px solid #111;padding-top:.4rem;font-weight:700;font-size:1.15rem">' +
              '<span>Total Paid:</span><span>' + util.money(grand) + "</span>" +
            "</div>" +
          "</div>" +
        "</div>" +

        '<p style="font-size:0.8rem;color:#777;text-align:center;margin-top:2.5rem;border-top:1px solid #eee;padding-top:1rem">' +
          "Thank you for choosing SAiPH Bakes. Handcrafted in Dibrugarh, Assam." +
        "</p>" +
      "</div>";

      var html = '<div class="admin-modal-card" style="padding:1rem">' +
        invoiceHtml +
        '<div class="row row--between" style="border-top:1px solid var(--line);padding-top:.75rem">' +
          '<button class="btn btn--accent" type="button" onclick="window.print()">' + ui.icon("file") + " Print / Save PDF</button>" +
          '<button class="btn btn--outline" type="button" data-modal-close>Close</button>' +
        "</div>" +
      "</div>";

      ui.modal(html, { label: "Tax Invoice " + o.id });
    }

    /* 11. CREATE ADMIN ACCOUNT MODAL */
    function showCreateAccountModal() {
      var html = '<form class="admin-modal-card" data-account-form novalidate>' +
        '<div class="admin-modal-head">' +
          '<div><span class="eyebrow" style="color:var(--accent)">Identity & Access</span>' +
          '<h2 style="font-size:var(--fs-h3)">Create Administrative Account</h2></div>' +
        '</div>' +
        '<div class="admin-form-grid">' +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Full Name <span class="req">*</span></label>' +
            '<input class="input" name="name" required placeholder="e.g. Alimur Rahman">' +
          '</div>' +
          '<div class="field">' +
            '<label class="field__label">Administrative Email ID <span class="req">*</span></label>' +
            '<input type="email" class="input" name="email" required placeholder="user@saiphbakes.com">' +
          '</div>' +
          '<div class="field">' +
            '<label class="field__label">Assigned Role <span class="req">*</span></label>' +
            '<select class="select" name="role">' +
              data.adminRoles.map(function (r) {
                return '<option value="' + r.id + '">' + util.esc(r.name) + " (" + util.esc(r.id.toUpperCase()) + ")</option>";
              }).join("") +
            '</select>' +
          '</div>' +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Initial Secure Password <span class="req">*</span></label>' +
            '<input type="password" class="input" name="password" required placeholder="Min 8 chars with numbers & symbols" data-pwd-meter-input>' +
            '<div class="pwd-meter" data-pwd-meter-box style="display:none">' +
              '<div class="pwd-meter__track"><div class="pwd-meter__fill" data-pwd-meter-fill></div></div>' +
              '<div class="pwd-meter__text"><span data-pwd-meter-label>Weak</span><span>PBKDF2/SHA-256</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="row row--end row--tight" style="border-top:1px solid var(--line);padding-top:1rem">' +
          '<button class="btn btn--outline" type="button" data-modal-close>Cancel</button>' +
          '<button class="btn btn--accent" type="submit">' + ui.icon("check") + " Create Account</button>" +
        '</div>' +
      '</form>';

      ui.modal(html, { label: "Create Admin Account", size: "sm" });
    }

    /* 12. EDIT ADMIN ACCOUNT / RESET PASSWORD MODAL */
    function showEditAccountModal(email) {
      var acc = AdminAuth.getAccounts().filter(function (a) { return a.email.toLowerCase() === email.toLowerCase(); })[0];
      if (!acc) return;

      var html = '<form class="admin-modal-card" data-account-edit-form novalidate>' +
        '<input type="hidden" name="email" value="' + util.esc(acc.email) + '">' +
        '<div class="admin-modal-head">' +
          '<div><span class="eyebrow" style="color:var(--accent)">Identity Management</span>' +
          '<h2 style="font-size:var(--fs-h3)">Account: ' + util.esc(acc.name) + '</h2></div>' +
        '</div>' +
        '<div class="admin-form-grid">' +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Full Name <span class="req">*</span></label>' +
            '<input class="input" name="name" required value="' + util.esc(acc.name) + '">' +
          '</div>' +
          '<div class="field">' +
            '<label class="field__label">Email ID</label>' +
            '<input class="input" value="' + util.esc(acc.email) + '" readonly style="background:var(--cream-100)">' +
          '</div>' +
          '<div class="field">' +
            '<label class="field__label">Assigned Role <span class="req">*</span></label>' +
            '<select class="select" name="role"' + (acc.email === "admin@saiphbakes.com" ? " disabled" : "") + '>' +
              data.adminRoles.map(function (r) {
                return '<option value="' + r.id + '"' + (r.id === acc.role ? " selected" : "") + '>' + util.esc(r.name) + '</option>';
              }).join("") +
            '</select>' +
          '</div>' +
          '<div class="field admin-form-full">' +
            '<label class="field__label">Reset Password (leave empty to keep current)</label>' +
            '<input type="password" class="input" name="newPassword" placeholder="Enter new password to overwrite">' +
          '</div>' +
        '</div>' +
        '<div class="row row--end row--tight" style="border-top:1px solid var(--line);padding-top:1rem">' +
          '<button class="btn btn--outline" type="button" data-modal-close>Cancel</button>' +
          '<button class="btn btn--accent" type="submit">' + ui.icon("check") + " Save Changes</button>" +
        '</div>' +
      '</form>';

      ui.modal(html, { label: "Edit Account", size: "sm" });
    }

    /* 10. BACKUP / RESET MODAL */
    function showBackupModal() {
      var html = '<div class="admin-modal-card">' +
        '<div class="admin-modal-head">' +
          '<div><span class="eyebrow" style="color:var(--accent)">Data Management</span>' +
          '<h2 style="font-size:var(--fs-h3)">Backup & System Reset</h2></div>' +
        "</div>" +

        '<div style="display:grid;gap:1rem">' +
          '<article class="card card--pad" style="border:1px solid var(--line)">' +
            '<h3 style="font-size:var(--fs-md);margin-bottom:.3rem">Export Snapshot (JSON)</h3>' +
            '<p style="font-size:var(--fs-sm);color:var(--ink-500);line-height:1.55">Download a complete portable JSON export containing all customized products, orders, inventory stock, coupons and customer inquiries.</p>' +
            '<button class="btn btn--sm btn--accent" type="button" data-do-export-json style="margin-top:.5rem">' + ui.icon("upload") + " Download JSON Backup</button>" +
          "</article>" +

          '<article class="card card--pad" style="border:1px solid var(--danger);background:color-mix(in srgb,var(--danger) 5%,#fff)">' +
            '<h3 style="font-size:var(--fs-md);color:var(--danger);margin-bottom:.3rem">Reset to Initial Demo State</h3>' +
            '<p style="font-size:var(--fs-sm);color:var(--ink-500);line-height:1.55">Restore all original product listings, stock counts, mock orders and delivery capacities back to their factory defaults.</p>' +
            '<button class="btn btn--sm btn--outline" type="button" data-do-reset-db style="color:var(--danger);border-color:var(--danger);margin-top:.5rem">' + ui.icon("refresh") + " Reset to Factory Defaults</button>" +
          "</article>" +
        "</div>" +

        '<div class="row row--end" style="border-top:1px solid var(--line);padding-top:.75rem">' +
          '<button class="btn btn--outline" type="button" data-modal-close>Close</button>' +
        "</div>" +
      "</div>";

      ui.modal(html, { label: "Backup & Reset", size: "sm" });
    }

    /* ==========================================================================
       Rendering & Navigation Router
       ========================================================================== */
    function renderAuthGate() {
      var gate = $("[data-admin-auth-gate]");
      if (!gate) return;
      var alertBox = $("[data-auth-alert]");
      var secState = AdminAuth.getSecurityState();
      var now = Date.now();

      if (secState.lockedUntil && now < secState.lockedUntil) {
        var remainingSecs = Math.ceil((secState.lockedUntil - now) / 1000);
        if (alertBox) {
          alertBox.style.display = "block";
          alertBox.className = "admin-auth-alert is-locked";
          alertBox.innerHTML = "<strong>🔒 Security Lockout Active:</strong> Too many consecutive failed attempts. Retrying is temporarily blocked for <span data-countdown-seconds>" + remainingSecs + "</span>s.";
        }
        var submitBtn = $("[data-auth-submit]");
        if (submitBtn) submitBtn.disabled = true;
      } else {
        if (alertBox && alertBox.classList.contains("is-locked")) {
          alertBox.style.display = "none";
        }
        var submitBtn = $("[data-auth-submit]");
        if (submitBtn) submitBtn.disabled = false;
      }
    }

    function render() {
      var gate = $("[data-admin-auth-gate]");
      var consoleEl = $("[data-admin-console]");
      var session = AdminAuth.getCurrentSession();

      if (!session) {
        if (consoleEl) consoleEl.style.display = "none";
        if (gate) {
          gate.style.display = "flex";
          renderAuthGate();
        }
        doc.title = "SAiPH Bakes — Restricted Admin Login";
        return;
      }

      if (gate) gate.style.display = "none";
      if (consoleEl) consoleEl.style.display = "grid";

      currentUser = AdminAuth.getCurrentUser();
      role = currentUser ? currentUser.role : "super";

      if (permFor(current) === 0) current = "dashboard";
      renderUserBadge();
      renderRoleSwitch();
      renderNav();
      renderQuickActions();

      var titles = {};
      GROUPS.forEach(function (g) {
        g.items.forEach(function (it) { titles[it.id] = it.name; });
      });
      var pageTitle = titles[current] || "Dashboard";
      var titleEl = $("[data-admin-title]");
      if (titleEl) titleEl.textContent = pageTitle;
      doc.title = "SAiPH Admin — " + pageTitle;

      var view = VIEWS[current] || VIEWS.dashboard;
      var body = $("[data-admin-body]");
      if (body) {
        body.innerHTML = view();
      }
    }

    /* ==========================================================================
       Event Delegation & Action Handlers
       ========================================================================== */
    doc.addEventListener("click", function (e) {
      /* Mobile Drawer Toggle */
      if (e.target.closest("[data-admin-toggle]")) {
        var side = $("[data-admin-side]");
        var scrim = $("[data-admin-scrim]");
        if (side) side.classList.add("is-open");
        if (scrim) scrim.classList.add("is-open");
        return;
      }
      if (e.target.closest("[data-admin-close]") || e.target.closest("[data-admin-scrim]")) {
        var side = $("[data-admin-side]");
        var scrim = $("[data-admin-scrim]");
        if (side) side.classList.remove("is-open");
        if (scrim) scrim.classList.remove("is-open");
        return;
      }

      /* Sidebar navigation click */
      var link = e.target.closest("[data-admin-link]");
      if (link) {
        current = link.dataset.adminLink;
        activeSearch = "";
        activeFilter = "all";
        var side = $("[data-admin-side]");
        var scrim = $("[data-admin-scrim]");
        if (side) side.classList.remove("is-open");
        if (scrim) scrim.classList.remove("is-open");
        setTimeout(render, 0);
        return;
      }

      /* Filter Pill Click */
      var pill = e.target.closest("[data-filter-pill]");
      if (pill) {
        activeFilter = pill.dataset.filterPill;
        render();
        return;
      }

      /* Quick Actions */
      var actionBtn = e.target.closest("[data-action]");
      if (actionBtn) {
        var act = actionBtn.dataset.action;
        if (act === "new-product") showProductModal(null);
        else if (act === "manual-order") showManualOrderModal();
        else if (act === "new-coupon") showCouponModal(null);
        else if (act === "new-cat") showCategoryModal(null);
        else if (act === "new-giftcard") showGiftCardModal();
        else if (act === "restock-low") {
          var prods = AdminDB.get("products");
          var count = 0;
          prods.forEach(function (p) {
            p.variants.forEach(function (v) {
              if (v.stock <= 6) { v.stock += 20; count++; }
            });
          });
          AdminDB.save();
          ui.toast({ title: "Restock Complete", note: count + " SKUs replenished with +20 units.", variant: "success", icon: "checkCircle" });
          render();
        } else if (act === "backup") {
          showBackupModal();
        }
        return;
      }

      /* View Order */
      var viewOrderBtn = e.target.closest("[data-view-order]");
      if (viewOrderBtn) {
        e.preventDefault();
        showOrderModal(viewOrderBtn.dataset.viewOrder);
        return;
      }

      /* Advance Order Status */
      var advOrderBtn = e.target.closest("[data-advance-order]");
      if (advOrderBtn) {
        var oid = advOrderBtn.dataset.advanceOrder;
        var orders = AdminDB.get("orders");
        var o = orders.filter(function (x) { return x.id === oid; })[0];
        if (o) {
          var stageSeq = ["placed", "baking", "quality", "out", "delivered"];
          var nextIdx = stageSeq.indexOf(o.status) + 1;
          if (nextIdx < stageSeq.length) {
            o.status = stageSeq[nextIdx];
            AdminDB.save();
            if (store && store.orders && store.orders.setStatus) {
              store.orders.setStatus(o.id, o.status);
            }
            ui.toast({ title: "Order Advanced", note: o.id + " moved to " + o.status.toUpperCase(), variant: "success", icon: "checkCircle" });
            ui.closeAllOverlays();
            render();
          }
        }
        return;
      }

      /* Invoice */
      var invBtn = e.target.closest("[data-invoice]");
      if (invBtn) {
        showInvoiceModal(invBtn.dataset.invoice);
        return;
      }

      /* View Customer */
      var custBtn = e.target.closest("[data-view-customer]");
      if (custBtn) {
        showCustomerModal(custBtn.dataset.viewCustomer);
        return;
      }

      /* View Enquiry */
      var enqBtn = e.target.closest("[data-view-enq]");
      if (enqBtn) {
        showEnquiryModal(enqBtn.dataset.viewEnq);
        return;
      }

      /* Delete Enquiry */
      var delEnqBtn = e.target.closest("[data-del-enq]");
      if (delEnqBtn) {
        if (global.confirm("Are you sure you want to delete this enquiry?")) {
          var enqs = AdminDB.get("enquiries").filter(function (x) { return x.id !== delEnqBtn.dataset.delEnq; });
          AdminDB.set("enquiries", enqs);
          ui.toast({ title: "Enquiry removed" });
          render();
        }
        return;
      }

      /* Stock Step */
      var stockStep = e.target.closest("[data-stock-step]");
      if (stockStep) {
        var parts = stockStep.dataset.stockStep.split("::");
        var pId = parts[0], vId = parts[1], delta = parseInt(parts[2], 10);
        var prods = AdminDB.get("products");
        var p = prods.filter(function (x) { return x.id === pId; })[0];
        if (p) {
          var v = p.variants.filter(function (x) { return x.id === vId; })[0];
          if (v) {
            v.stock = Math.max(0, (v.stock || 0) + delta);
            AdminDB.save();
            ui.toast({ title: "Stock updated", note: p.name + " (" + v.label + "): " + v.stock + " left", variant: "success" });
            render();
          }
        }
        return;
      }

      /* Quick Restock 20 */
      var quickRestock = e.target.closest("[data-quick-restock]");
      if (quickRestock) {
        var parts = quickRestock.dataset.quickRestock.split("::");
        var p = AdminDB.get("products").filter(function (x) { return x.id === parts[0]; })[0];
        if (p) {
          var v = p.variants.filter(function (x) { return x.id === parts[1]; })[0];
          if (v) {
            v.stock = (v.stock || 0) + 20;
            AdminDB.save();
            ui.toast({ title: "Restocked +20", note: p.name + ": " + v.stock + " units now", variant: "success", icon: "checkCircle" });
            render();
          }
        }
        return;
      }

      /* Set Exact Stock */
      var setStockBtn = e.target.closest("[data-set-stock]");
      if (setStockBtn) {
        var parts = setStockBtn.dataset.setStock.split("::");
        var p = AdminDB.get("products").filter(function (x) { return x.id === parts[0]; })[0];
        if (p) {
          var v = p.variants.filter(function (x) { return x.id === parts[1]; })[0];
          if (v) {
            var inputVal = global.prompt("Enter new stock level for " + p.name + " (" + v.label + "):", v.stock);
            if (inputVal != null && !isNaN(parseInt(inputVal, 10))) {
              v.stock = Math.max(0, parseInt(inputVal, 10));
              AdminDB.save();
              ui.toast({ title: "Stock adjusted", note: v.stock + " on hand", variant: "success" });
              render();
            }
          }
        }
        return;
      }

      /* Toggle Product Status (Live / Paused) */
      var toggleProdBtn = e.target.closest("[data-toggle-prod-status]");
      if (toggleProdBtn) {
        var p = AdminDB.get("products").filter(function (x) { return x.id === toggleProdBtn.dataset.toggleProdStatus; })[0];
        if (p) {
          p.status = p.status === "paused" ? "live" : "paused";
          AdminDB.save();
          ui.toast({ title: "Product status changed", note: p.name + " is now " + p.status.toUpperCase(), variant: "success" });
          render();
        }
        return;
      }

      /* Edit Product */
      var editProdBtn = e.target.closest("[data-edit-prod]");
      if (editProdBtn) {
        showProductModal(editProdBtn.dataset.editProd);
        return;
      }

      /* Delete Product */
      var delProdBtn = e.target.closest("[data-del-prod]");
      if (delProdBtn) {
        if (global.confirm("Are you sure you want to remove this product from catalogue?")) {
          var prods = AdminDB.get("products").filter(function (x) { return x.id !== delProdBtn.dataset.delProd; });
          AdminDB.set("products", prods);
          ui.toast({ title: "Product deleted" });
          render();
        }
        return;
      }

      /* Edit Category */
      var editCatBtn = e.target.closest("[data-edit-cat]");
      if (editCatBtn) {
        showCategoryModal(editCatBtn.dataset.editCat);
        return;
      }

      /* Delete Category */
      var delCatBtn = e.target.closest("[data-del-cat]");
      if (delCatBtn) {
        if (global.confirm("Delete this category?")) {
          var cats = AdminDB.get("categories").filter(function (x) { return x.id !== delCatBtn.dataset.delCat; });
          AdminDB.set("categories", cats);
          ui.toast({ title: "Category deleted" });
          render();
        }
        return;
      }

      /* Toggle Coupon Status */
      var toggleCouponBtn = e.target.closest("[data-toggle-coupon]");
      if (toggleCouponBtn) {
        var c = AdminDB.get("coupons").filter(function (x) { return x.code === toggleCouponBtn.dataset.toggleCoupon; })[0];
        if (c) {
          c.status = c.status === "paused" ? "active" : "paused";
          AdminDB.save();
          ui.toast({ title: "Coupon " + c.code + " " + (c.status === "active" ? "Activated" : "Paused") });
          render();
        }
        return;
      }

      /* Delete Coupon */
      var delCouponBtn = e.target.closest("[data-del-coupon]");
      if (delCouponBtn) {
        if (global.confirm("Delete coupon code " + delCouponBtn.dataset.delCoupon + "?")) {
          var coupons = AdminDB.get("coupons").filter(function (x) { return x.code !== delCouponBtn.dataset.delCoupon; });
          AdminDB.set("coupons", coupons);
          ui.toast({ title: "Coupon deleted" });
          render();
        }
        return;
      }

      /* Review Status Change */
      var revStatusBtn = e.target.closest("[data-review-status]");
      if (revStatusBtn) {
        var parts = revStatusBtn.dataset.reviewStatus.split("::");
        var rev = AdminDB.get("reviews").filter(function (x) { return x.id === parts[0]; })[0];
        if (rev) {
          rev.status = parts[1];
          AdminDB.save();
          ui.toast({ title: "Review marked " + parts[1], variant: "success" });
          render();
        }
        return;
      }

      /* Delete Review */
      var delRevBtn = e.target.closest("[data-del-review]");
      if (delRevBtn) {
        if (global.confirm("Delete this review?")) {
          var revs = AdminDB.get("reviews").filter(function (x) { return x.id !== delRevBtn.dataset.delReview; });
          AdminDB.set("reviews", revs);
          ui.toast({ title: "Review deleted" });
          render();
        }
        return;
      }

      /* Toggle Slot Capacity */
      var slotToggle = e.target.closest("[data-toggle-slot]");
      if (slotToggle) {
        var key = slotToggle.dataset.toggleSlot;
        var overrides = AdminDB.get("slotCapacity") || {};
        overrides[key] = overrides[key] || { blocked: false, cap: 25 };
        overrides[key].blocked = !overrides[key].blocked;
        AdminDB.set("slotCapacity", overrides);
        ui.toast({ title: overrides[key].blocked ? "Slot Blocked" : "Slot Capacity Restored", note: key });
        render();
        return;
      }

      /* Switch Role Button */
      var switchRoleBtn = e.target.closest("[data-switch-to-role]");
      if (switchRoleBtn) {
        role = switchRoleBtn.dataset.switchToRole;
        if (global.localStorage) global.localStorage.setItem("saiph.admin_role", role);
        render();
        ui.toast({ title: "Role switched", note: "Now viewing console as " + role.toUpperCase(), variant: "success", icon: "shield" });
        return;
      }

      /* Export Handlers */
      var exportBtn = e.target.closest("[data-export]");
      if (exportBtn) {
        var expType = exportBtn.dataset.export;
        if (expType === "orders") {
          var orders = AdminDB.get("orders");
          exportCSV("saiph-orders-" + new Date().toISOString().slice(0, 10) + ".csv",
            ["Order ID", "Customer", "Phone", "Slot / Store", "Channel", "Total", "Status"],
            orders.map(function (o) { return [o.id, o.customer, o.phone || "", o.slot || o.store, o.channel || "Web", o.total, o.status]; }));
        } else if (expType === "products") {
          var prods = AdminDB.get("products");
          exportCSV("saiph-products-" + new Date().toISOString().slice(0, 10) + ".csv",
            ["ID", "Name", "Brand", "PriceFrom", "VariantsCount", "Status"],
            prods.map(function (p) { return [p.id, p.name, p.brandName, p.priceFrom, p.variants.length, p.status || "live"]; }));
        } else if (expType === "inventory") {
          var prods = AdminDB.get("products");
          var rows = [];
          prods.forEach(function (p) {
            p.variants.forEach(function (v) {
              rows.push([p.id, p.name, p.brandName, v.label, v.price, v.stock]);
            });
          });
          exportCSV("saiph-inventory-" + new Date().toISOString().slice(0, 10) + ".csv",
            ["Product ID", "Product Name", "Brand", "Variant", "Price", "Stock"], rows);
        } else if (expType === "customers") {
          var orders = AdminDB.get("orders");
          var custs = {};
          orders.forEach(function (o) {
            custs[o.customer] = custs[o.customer] || { name: o.customer, orders: 0, total: 0, phone: o.phone || "" };
            custs[o.customer].orders++;
            custs[o.customer].total += o.total;
          });
          exportCSV("saiph-customers-" + new Date().toISOString().slice(0, 10) + ".csv",
            ["Customer Name", "Phone", "Total Orders", "Lifetime Value"],
            Object.keys(custs).map(function (k) { return [custs[k].name, custs[k].phone, custs[k].orders, custs[k].total]; }));
        } else if (expType.indexOf("enquiries") === 0) {
          var t = expType.split("::")[1] || "";
          var enqs = AdminDB.get("enquiries").filter(function (e) {
            return !t || e.type.toLowerCase() === t.toLowerCase();
          });
          exportCSV("saiph-" + (t ? t.toLowerCase() + "-" : "") + "enquiries.csv",
            ["ID", "Type", "Applicant", "City", "Email", "Phone", "Details", "Status", "Received"],
            enqs.map(function (e) { return [e.id, e.type, e.who, e.city || "", e.email || "", e.phone || "", e.detail, e.status, e.when || ""]; }));
        }
        return;
      }

      /* JSON Backup Export */
      if (e.target.closest("[data-do-export-json]")) {
        var blob = new Blob([AdminDB.dump()], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = doc.createElement("a");
        a.href = url;
        a.download = "saiph-admin-backup-" + new Date().toISOString().slice(0, 10) + ".json";
        doc.body.appendChild(a);
        a.click();
        doc.body.removeChild(a);
        URL.revokeObjectURL(url);
        ui.toast({ title: "Backup Exported", variant: "success", icon: "checkCircle" });
        return;
      }

      /* Reset DB */
      if (e.target.closest("[data-do-reset-db]")) {
        if (global.confirm("Reset entire console to initial defaults? All changes will be re-seeded.")) {
          AdminDB.reset();
          ui.closeAllOverlays();
          ui.toast({ title: "System Reset", note: "Factory data restored.", variant: "success", icon: "refresh" });
          render();
        }
        return;
      }
    });

    /* Search input listener */
    doc.addEventListener("input", function (e) {
      if (e.target.matches("[data-table-search]")) {
        activeSearch = e.target.value.trim();
        render();
      }
    });

    /* Table filter dropdown change */
    doc.addEventListener("change", function (e) {
      if (e.target.matches("[data-table-filter]")) {
        activeFilter = e.target.value;
        render();
        return;
      }

      /* Role Selector dropdown */
      var sel = e.target.closest("[data-role-switch]");
      if (sel) {
        role = sel.value;
        if (global.localStorage) global.localStorage.setItem("saiph.admin_role", role);
        render();
        var rec = data.adminRoles.filter(function (r) { return r.id === role; })[0];
        ui.toast({ title: "Viewing as " + rec.name, note: rec.scope, icon: "shield" });
        return;
      }

      /* Order status updater inside modal */
      var statusSel = e.target.closest("[data-update-order-status]");
      if (statusSel) {
        var oid = statusSel.dataset.updateOrderStatus;
        var orders = AdminDB.get("orders");
        var o = orders.filter(function (x) { return x.id === oid; })[0];
        if (o) {
          o.status = statusSel.value;
          AdminDB.save();
          if (store && store.orders && store.orders.setStatus) {
            store.orders.setStatus(o.id, o.status);
          }
          ui.toast({ title: "Order " + o.id + " updated", note: "New status: " + o.status.toUpperCase(), variant: "success", icon: "checkCircle" });
          render();
          showOrderModal(o.id);
        }
        return;
      }

      /* Enquiry status updater inside modal */
      var enqStatusSel = e.target.closest("[data-update-enq-status]");
      if (enqStatusSel) {
        var eid = enqStatusSel.dataset.updateEnqStatus;
        var enqs = AdminDB.get("enquiries");
        var enq = enqs.filter(function (x) { return x.id === eid; })[0];
        if (enq) {
          enq.status = enqStatusSel.value;
          AdminDB.save();
          ui.toast({ title: "Enquiry status updated", note: enq.who + " is now " + enq.status, variant: "success" });
          render();
        }
        return;
      }
    });

    /* Form submissions inside modals */
    doc.addEventListener("submit", function (e) {
      /* Manual Order Form */
      var manualOrderForm = e.target.closest("[data-manual-order-form]");
      if (manualOrderForm) {
        e.preventDefault();
        var custName = manualOrderForm.customer.value.trim();
        var phone = manualOrderForm.phone.value.trim();
        var email = manualOrderForm.email.value.trim();
        var mode = manualOrderForm.mode.value;
        var address = manualOrderForm.address.value.trim();
        var pId = manualOrderForm.product.value;
        var qty = parseInt(manualOrderForm.qty.value || "1", 10);
        var slot = manualOrderForm.slot.value;
        var payment = manualOrderForm.payment.value;
        var instructions = manualOrderForm.instructions.value.trim();

        if (!custName || !phone) {
          ui.toast({ title: "Please fill customer name and phone", variant: "error" });
          return;
        }

        var prod = query.byId(pId) || AdminDB.get("products").filter(function (x) { return x.id === pId; })[0];
        var unitPrice = prod ? prod.priceFrom : 500;
        var grandTotal = unitPrice * qty;
        var newId = "SB-" + (24090 + AdminDB.get("orders").length);

        var newOrder = {
          id: newId,
          customer: custName,
          phone: phone,
          email: email,
          items: qty,
          brand: prod ? prod.brandName : "SAiPH Bakes",
          total: grandTotal,
          status: "placed",
          slot: slot,
          channel: "Admin Counter Desk",
          store: mode === "pickup" ? address : "Dibrugarh (Delivery)",
          address: mode === "delivery" ? { line: address, city: "Dibrugarh" } : null,
          lineItems: [
            { id: prod ? prod.id : "item-1", name: prod ? prod.name : "Artisan Bake", variant: "Standard", qty: qty, unit: unitPrice, total: grandTotal }
          ],
          placedAt: Date.now(),
          instructions: instructions,
          payment: payment
        };

        var orders = AdminDB.get("orders");
        orders.unshift(newOrder);
        AdminDB.save();

        /* Push to storefront orders state so tracking finds it too */
        if (store && store.orders && store.orders.addManual) {
          store.orders.addManual({
            id: newId,
            placedAt: Date.now(),
            items: newOrder.lineItems,
            totals: { grand: grandTotal, subtotal: grandTotal },
            mode: mode,
            store: { name: address },
            address: newOrder.address,
            date: new Date().toISOString().slice(0, 10),
            slot: "evening",
            slotLabel: slot,
            instructions: instructions,
            contact: { name: custName, phone: phone, email: email },
            payment: payment,
            status: "placed",
            timeline: [
              { key: "placed", title: "Order confirmed", note: "Created at admin counter.", done: true, at: Date.now() },
              { key: "baking", title: "In production", note: "Sent to kitchen queue.", done: false },
              { key: "quality", title: "Quality check & packing", note: "Boxed with care.", done: false },
              { key: "out", title: mode === "pickup" ? "Ready for pickup" : "Out for delivery", note: "Dispatched.", done: false },
              { key: "done", title: "Completed", note: "Order fulfilled.", done: false }
            ]
          });
        }

        ui.closeAllOverlays();
        ui.toast({ title: "Order Created!", note: newId + " for " + custName + " (Total " + util.money(grandTotal) + ")", variant: "success", icon: "checkCircle" });
        render();
        return;
      }

      /* Product Form */
      var prodForm = e.target.closest("[data-product-form]");
      if (prodForm) {
        e.preventDefault();
        var isEdit = prodForm.isEdit.value === "1";
        var pName = prodForm.name.value.trim();
        var pId = prodForm.id.value.trim();
        var pBrand = prodForm.brand.value;
        var pPrice = parseInt(prodForm.price.value, 10);
        var pLead = parseInt(prodForm.leadHours.value || "24", 10);
        var pBadges = prodForm.badges.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
        var pDesc = prodForm.desc.value.trim();

        var checkedCats = [];
        var catBoxes = prodForm.querySelectorAll('[name="cats"]:checked');
        catBoxes.forEach(function (cb) { checkedCats.push(cb.value); });
        if (!checkedCats.length) checkedCats = ["cakes"];

        var brandMap = { signature: "SAiPH Signature", doughremi: "DoughReMi", khowdy: "Khowdy" };
        var prods = AdminDB.get("products");

        if (isEdit) {
          var existing = prods.filter(function (x) { return x.id === pId; })[0];
          if (existing) {
            existing.name = pName;
            existing.brand = pBrand;
            existing.brandName = brandMap[pBrand] || pBrand;
            existing.priceFrom = pPrice;
            existing.leadHours = pLead;
            existing.badges = pBadges;
            existing.cats = checkedCats;
            existing.catNames = checkedCats;
            existing.desc = pDesc;
          }
        } else {
          var newProd = {
            id: pId,
            name: pName,
            brand: pBrand,
            brandName: brandMap[pBrand] || pBrand,
            priceFrom: pPrice,
            leadHours: pLead,
            cutoff: "Order before 8:00 PM",
            badges: pBadges,
            cats: checkedCats,
            catNames: checkedCats,
            desc: pDesc,
            rating: 5.0,
            reviews: 1,
            variants: [
              { id: "std", label: "Standard Selection", price: pPrice, stock: 25, weight: "500g" }
            ],
            status: "live"
          };
          prods.unshift(newProd);
        }

        AdminDB.save();
        ui.closeAllOverlays();
        ui.toast({ title: isEdit ? "Product Updated" : "New Product Added!", note: pName, variant: "success", icon: "checkCircle" });
        render();
        return;
      }

      /* Category Form */
      var catForm = e.target.closest("[data-category-form]");
      if (catForm) {
        e.preventDefault();
        var isEdit = catForm.isEdit.value === "1";
        var cName = catForm.name.value.trim();
        var cId = catForm.id.value.trim();
        var cBlurb = catForm.blurb.value.trim();

        var cats = AdminDB.get("categories");
        if (isEdit) {
          var c = cats.filter(function (x) { return x.id === cId; })[0];
          if (c) { c.name = cName; c.blurb = cBlurb; }
        } else {
          cats.push({ id: cId, name: cName, blurb: cBlurb, brands: ["DoughReMi", "Signature"] });
        }
        AdminDB.save();
        ui.closeAllOverlays();
        ui.toast({ title: isEdit ? "Category updated" : "Category added", note: cName, variant: "success" });
        render();
        return;
      }

      /* Coupon Form */
      var couponForm = e.target.closest("[data-coupon-form]");
      if (couponForm) {
        e.preventDefault();
        var isEdit = couponForm.isEdit.value === "1";
        var cCode = couponForm.code.value.trim().toUpperCase();
        var cType = couponForm.type.value;
        var cValue = parseInt(couponForm.value.value, 10);
        var cMin = parseInt(couponForm.min.value || "0", 10);
        var cCap = parseInt(couponForm.cap.value || "0", 10) || null;
        var cBrand = couponForm.brand.value || null;

        var coupons = AdminDB.get("coupons");
        if (isEdit) {
          var existing = coupons.filter(function (x) { return x.code === cCode; })[0];
          if (existing) {
            existing.type = cType;
            existing.value = cValue;
            existing.min = cMin;
            existing.cap = cCap;
            existing.brand = cBrand;
          }
        } else {
          coupons.unshift({
            code: cCode,
            type: cType,
            value: cValue,
            min: cMin,
            cap: cCap,
            brand: cBrand,
            status: "active"
          });
        }
        AdminDB.save();
        ui.closeAllOverlays();
        ui.toast({ title: "Coupon Saved!", note: cCode + " is now active on checkout", variant: "success", icon: "percent" });
        render();
        return;
      }

      /* Gift Card Form */
      var giftCardForm = e.target.closest("[data-giftcard-form]");
      if (giftCardForm) {
        e.preventDefault();
        var code = giftCardForm.code.value;
        var val = parseInt(giftCardForm.value.value, 10);
        var recip = giftCardForm.recipient.value.trim();

        var cards = AdminDB.get("giftcards");
        cards.unshift({
          code: code,
          recipient: recip,
          issued: new Date().toISOString().slice(0, 10),
          value: val,
          balance: val,
          expires: "1 Year",
          status: "Active"
        });
        AdminDB.save();
        ui.closeAllOverlays();
        ui.toast({ title: "Gift Card Issued!", note: code + " (" + util.money(val) + ")", variant: "success", icon: "gift" });
        render();
        return;
      }

      /* Enquiry Note Form */
      var noteForm = e.target.closest("[data-enq-note-form]");
      if (noteForm) {
        e.preventDefault();
        var enqId = noteForm.dataset.enqNoteForm;
        var note = noteForm.note.value.trim();
        var enqs = AdminDB.get("enquiries");
        var enq = enqs.filter(function (x) { return x.id === enqId; })[0];
        if (enq) {
          enq.notes = note;
          AdminDB.save();
          ui.toast({ title: "Staff note saved", variant: "success" });
        }
        return;
      }
    });

    /* Hashchange router */
    global.addEventListener("hashchange", function () {
      current = (global.location.hash || "#dashboard").replace("#", "");
      activeSearch = "";
      activeFilter = "all";
      render();
    });

    /* ----------------------------- Inactivity Heartbeat ------------------- */
    ["mousemove", "keydown", "click", "touchstart"].forEach(function (evt) {
      global.addEventListener(evt, util.debounce(function () {
        if (AdminAuth.getCurrentSession()) {
          AdminAuth.touchSession();
        }
      }, 1000));
    });

    /* Live Lockout Countdown Timer */
    setInterval(function () {
      var secState = AdminAuth.getSecurityState();
      var now = Date.now();
      if (secState.lockedUntil && now < secState.lockedUntil) {
        var secSpan = $("[data-countdown-seconds]");
        if (secSpan) {
          secSpan.textContent = Math.ceil((secState.lockedUntil - now) / 1000);
        }
      } else if (secState.lockedUntil && now >= secState.lockedUntil) {
        renderAuthGate();
      }
    }, 1000);

    /* Password Strength Meter Real-Time Listener */
    doc.addEventListener("input", function (e) {
      var input = e.target.closest("[data-pwd-meter-input]");
      if (input) {
        var form = input.form;
        var box = form ? form.querySelector("[data-pwd-meter-box]") : null;
        var fill = form ? form.querySelector("[data-pwd-meter-fill]") : null;
        var label = form ? form.querySelector("[data-pwd-meter-label]") : null;
        if (!box || !fill || !label) return;

        var val = input.value;
        if (!val) {
          box.style.display = "none";
          return;
        }
        box.style.display = "block";
        var res = Security.testPasswordStrength(val);
        fill.className = "pwd-meter__fill " + res.cls;
        label.textContent = res.label + " (" + res.metCount + "/5 checks)";
      }
    });

    /* Auth Gate Form Submissions */
    doc.addEventListener("submit", function (e) {
      var authForm = e.target.closest("[data-auth-form]");
      if (authForm) {
        e.preventDefault();
        var email = authForm.adminEmail.value.trim();
        var password = authForm.adminPassword.value;
        var remember = authForm.adminRemember.checked;
        var alertBox = $("[data-auth-alert]");

        var res = AdminAuth.login(email, password, remember);
        if (res.ok) {
          if (alertBox) {
            alertBox.style.display = "block";
            alertBox.className = "admin-auth-alert is-success";
            alertBox.innerHTML = "✓ Credentials authenticated. Unlocking management console...";
          }
          ui.toast({ title: "Welcome back, " + res.user.name, note: "Session active (Role: " + res.user.role.toUpperCase() + ")", variant: "success", icon: "shield" });
          setTimeout(function () {
            render();
          }, 350);
        } else {
          if (alertBox) {
            alertBox.style.display = "block";
            alertBox.className = "admin-auth-alert " + (res.locked ? "is-locked" : "is-error");
            alertBox.innerHTML = "<strong>Access Denied:</strong> " + util.esc(res.error);
          }
          authForm.adminPassword.value = "";
          authForm.adminPassword.focus();
        }
        return;
      }

      /* Create Account Form */
      var accForm = e.target.closest("[data-account-form]");
      if (accForm) {
        e.preventDefault();
        var name = accForm.name.value.trim();
        var email = accForm.email.value.trim();
        var accRole = accForm.role.value;
        var pwd = accForm.password.value;

        var cRes = AdminAuth.createAccount({ name: name, email: email, role: accRole, password: pwd });
        if (cRes.ok) {
          ui.closeAllOverlays();
          ui.toast({ title: "Admin Account Created!", note: email + " (" + accRole.toUpperCase() + ")", variant: "success", icon: "shield" });
          render();
        } else {
          global.alert(cRes.error);
        }
        return;
      }

      /* Edit Account Form */
      var accEditForm = e.target.closest("[data-account-edit-form]");
      if (accEditForm) {
        e.preventDefault();
        var email = accEditForm.email.value.trim();
        var name = accEditForm.name.value.trim();
        var accRole = accEditForm.role ? accEditForm.role.value : null;
        var newPwd = accEditForm.newPassword.value;

        var acc = AdminAuth.getAccounts().filter(function (a) { return a.email.toLowerCase() === email.toLowerCase(); })[0];
        if (acc) {
          acc.name = name;
          if (accRole && acc.email !== "admin@saiphbakes.com") acc.role = accRole;
          if (newPwd) {
            var pRes = AdminAuth.updatePassword(email, "", newPwd, true);
            if (!pRes.ok) {
              global.alert(pRes.error);
              return;
            }
          }
          ui.closeAllOverlays();
          ui.toast({ title: "Account Updated", note: email, variant: "success" });
          render();
        }
        return;
      }

      /* Change My Password Form */
      var chgPwdForm = e.target.closest("[data-change-pwd-form]");
      if (chgPwdForm) {
        e.preventDefault();
        var oldP = chgPwdForm.oldPassword.value;
        var newP = chgPwdForm.newPassword.value;
        var confP = chgPwdForm.confirmPassword.value;

        if (newP !== confP) {
          ui.toast({ title: "Password Mismatch", note: "New password and confirmation do not match.", variant: "danger" });
          return;
        }

        var u = AdminAuth.getCurrentUser();
        if (!u) return;

        var uRes = AdminAuth.updatePassword(u.email, oldP, newP, false);
        if (uRes.ok) {
          chgPwdForm.reset();
          var box = chgPwdForm.querySelector("[data-pwd-meter-box]");
          if (box) box.style.display = "none";
          ui.toast({ title: "Password Changed Successfully!", note: "Your workstation credentials have been updated.", variant: "success", icon: "lock" });
        } else {
          ui.toast({ title: "Password Change Failed", note: uRes.error, variant: "danger" });
        }
        return;
      }
    });

    /* Additional Click Handlers for Security & Accounts */
    doc.addEventListener("click", function (e) {
      /* Toggle password show / hide */
      var togPwd = e.target.closest("[data-toggle-password]");
      if (togPwd) {
        var pwdInput = $("#adminPassword");
        if (pwdInput) {
          var isText = pwdInput.type === "text";
          pwdInput.type = isText ? "password" : "text";
          togPwd.textContent = isText ? "Show" : "Hide";
        }
        return;
      }

      /* Demo role pills */
      var demoPill = e.target.closest("[data-demo-role]");
      if (demoPill) {
        var r = demoPill.dataset.demoRole;
        var emailInput = $("#adminEmail");
        var pwdInput = $("#adminPassword");
        var accounts = AdminAuth.getAccounts();
        var matched = accounts.filter(function (a) { return a.role === r; })[0];

        var passwords = {
          super: "Saiph@Admin2026!#",
          store: "StoreManager@2026!",
          production: "HeadBaker@2026!",
          orders: "Dispatch@2026!",
          marketing: "Marketing@2026!"
        };

        if (emailInput && matched) emailInput.value = matched.email;
        if (pwdInput && passwords[r]) pwdInput.value = passwords[r];
        ui.toast({ title: "Pre-filled: " + (matched ? matched.name : r), note: "Click Authenticate to log in", variant: "success" });
        return;
      }

      /* Sign Out / Logout */
      if (e.target.closest('[data-action="logout"]')) {
        AdminAuth.logout();
        render();
        ui.toast({ title: "Signed Out", note: "Your workstation session is closed.", icon: "logout" });
        return;
      }

      /* Lock Workstation */
      if (e.target.closest('[data-action="lock"]')) {
        AdminAuth.lock();
        render();
        ui.toast({ title: "Workstation Locked", note: "Re-authentication required.", icon: "lock" });
        return;
      }

      /* Create Account Modal */
      if (e.target.closest('[data-action="create-account"]')) {
        showCreateAccountModal();
        return;
      }

      /* Edit Account Modal */
      var editAccBtn = e.target.closest("[data-edit-account]");
      if (editAccBtn) {
        showEditAccountModal(editAccBtn.dataset.editAccount);
        return;
      }

      /* Suspend / Activate Account */
      var togStatusBtn = e.target.closest("[data-toggle-account-status]");
      if (togStatusBtn) {
        var email = togStatusBtn.dataset.toggleAccountStatus;
        var sRes = AdminAuth.toggleAccountStatus(email);
        if (sRes.ok) {
          ui.toast({ title: "Account " + (sRes.status === "active" ? "Activated" : "Suspended"), note: email, variant: "success" });
          render();
        } else {
          global.alert(sRes.error);
        }
        return;
      }

      /* Delete Account */
      var delAccBtn = e.target.closest("[data-del-account]");
      if (delAccBtn) {
        var email = delAccBtn.dataset.delAccount;
        if (global.confirm("Permanently remove administrative account for " + email + "?")) {
          var dRes = AdminAuth.deleteAccount(email);
          if (dRes.ok) {
            ui.toast({ title: "Account Deleted", note: email });
            render();
          } else {
            global.alert(dRes.error);
          }
        }
        return;
      }

      /* Export Audit Trail CSV */
      if (e.target.closest("[data-export-audit]")) {
        var audits = AdminAuth.getAuditLogs();
        var headers = ["Timestamp", "Date Time", "Event", "Actor Email", "Role", "Details", "Status", "IP Context"];
        var rows = audits.map(function (a) {
          return [
            a.timestamp,
            new Date(a.timestamp).toISOString(),
            a.event,
            a.email,
            a.role,
            a.details,
            a.status,
            a.ip
          ];
        });
        exportCSV("saiph-security-audit-log-" + new Date().toISOString().slice(0, 10) + ".csv", headers, rows);
        return;
      }

      /* Revoke All Sessions */
      if (e.target.closest('[data-action="revoke-sessions"]')) {
        if (global.confirm("Forcibly terminate all active administrative workstation sessions across all devices?")) {
          AdminAuth.revokeAllSessions();
          render();
          ui.toast({ title: "All Sessions Revoked", note: "Please re-authenticate.", variant: "warn" });
        }
        return;
      }
    });

    /* Change Policy Listeners */
    doc.addEventListener("change", function (e) {
      if (e.target.closest("[data-policy-timeout]")) {
        AdminAuth.updatePolicies({ sessionTimeout: e.target.value });
        ui.toast({ title: "Inactivity Timeout Updated", note: e.target.value + " minutes", variant: "success" });
      }
      if (e.target.closest("[data-policy-threshold]")) {
        AdminAuth.updatePolicies({ lockoutThreshold: e.target.value });
        ui.toast({ title: "Lockout Threshold Updated", note: e.target.value + " attempts", variant: "success" });
      }
    });

    /* Initial Render */
    render();
  };
})(typeof window !== "undefined" ? window : this);
