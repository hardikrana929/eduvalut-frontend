import { useState, useEffect } from "react";
import axios from "axios";
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await axios.get(
                    "https://eduvalut-backend.vercel.app/api/student/me",
                    { withCredentials: true }
                );
                setUser(res.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.user));
            } catch {
                setUser(null);
                localStorage.removeItem("user");
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        verify();
    }, []);

    return { user, loading, error };
};