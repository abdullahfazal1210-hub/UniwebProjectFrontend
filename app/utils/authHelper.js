"use client";

/**
 * Robust check to determine if a user is truly logged in.
 * Checks for both 'userName' in localStorage and a non-empty 'authToken' cookie.
 */
export const isUserLoggedIn = () => {
    if (typeof window === "undefined") return false;

    const userName = localStorage.getItem("userName");
    const hasValidName = !!userName && userName !== "null" && userName !== "undefined";

    const hasToken = document.cookie.split(';').some(c => {
        const trimmed = c.trim();
        if (!trimmed.startsWith('authToken=')) return false;
        const value = trimmed.split('=')[1];
        return value && value.trim().length > 0;
    });

    return hasValidName && hasToken;
};
