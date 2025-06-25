export interface AuthLogoutEvent extends CustomEvent {
    detail: {
        reason: string;
    };
}

class TokenManager {
    getAccessToken(): string | null {
        return sessionStorage.getItem("access_token");
    }

    setAccessToken(token: string): void {
        sessionStorage.setItem("access_token", token);
    }

    clear(): void {
        sessionStorage.removeItem("access_token");
    }

    hasToken(): boolean {
        return Boolean(this.getAccessToken());
    }

    getTokenExpiration(): number {
        const token = this.getAccessToken();
        if (!token) return 0;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp * 1000;
        } catch {
            return 0;
        }
    }

    isExpired(): boolean {
        const exp = this.getTokenExpiration();
        return exp < Date.now();
    }

    handleSessionExpiration(reason = "session_expired"): void {
        window.dispatchEvent(
            new CustomEvent("auth-logout", {
                detail: {reason},
            }) as AuthLogoutEvent
        );
    }
}

export const tokenManager = new TokenManager();
