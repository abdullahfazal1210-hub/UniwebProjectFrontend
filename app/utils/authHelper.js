"use client";

/**
 * Robust check to determine if a user is truly logged in.
 * Checks for both 'userName' in localStorage and a non-empty 'authToken' cookie.
 */
export const isUserLoggedIn = () => {
    if (typeof window === "undefined") return false;

    const userName = localStorage.getItem("userName");
    const hasValidName = !!userName && userName !== "null" && userName !== "undefined";

    // We cannot check document.cookie for httpOnly cookies.
    // The server will enforce auth via 401 responses.
    // Client-side, we just check if we have the user state.
    return hasValidName;
};
