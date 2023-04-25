const getGoogleUrl = () => {
    console.log("ingetgoogle")
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    console.log(import.meta.env.VITE_APP_GOOGLE_CLIENT_ID);

    const options = {
        redirect_uri: import.meta.env.VITE_APP_GOOGLE_OAUTH_REDIRECT_URL,
        client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),

    };

    const qs = new URLSearchParams(options);
    console.log(`${rootUrl}?${qs.toString()}`)

    return `${rootUrl}?${qs.toString()}`;

}

export default getGoogleUrl;