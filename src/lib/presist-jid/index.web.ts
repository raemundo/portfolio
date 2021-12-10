import cookie from "cookie";

export async function presistJid(val: string) {
    document.cookie = `jid=${val}`;
}

export async function getJid() {
    const cookies = cookie.parse(document.cookie || "");
    if (cookies.jid) {
        return cookies.jid
    }
}

export async function removeJid() {
    document.cookie = `jid=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}