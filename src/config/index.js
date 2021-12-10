const state = {
    web: {
        config: {
            firebase: {
                apiKey: "AIzaSyB8tMwG1_WDdwGbrbknv0XxSwyrIm2KtSw",
                authDomain: "vair-b8dc2.firebaseapp.com",
                projectId: "vair-b8dc2",
                storageBucket: "vair-b8dc2.appspot.com",
                messagingSenderId: "73411451943",
                appId: "1:73411451943:web:6a89e8f64b533bc8af0202",
                measurementId: "G-8JG9LEGRDZ"
            }
        }
    },
    android: {
        package: "com.lsopa.vair",
        versionCode: 1,
        googleServicesFile: "./google-services.json"
    },
    ios: {
        bundleIdentifier: "com.lsopa.vair",
        googleServicesFile: "./GoogleService-Info.plist"
    },
    extra: {
        imageDomainList: [],
        manifest: {
            "output": "./public/",
            "name": "appName",
            "short_name": "appName",
            "theme_color": "#2196f3",
            "background_color": "#efeff1",
            "display": "standalone",
            "Scope": "/",
            "start_url": "/",
            "icons": [
            ],
            "shortcuts": [
            ],
            "splash_pages": null
        },
        robot: {
            output: "./public/",
            policy: [
                {
                    userAgent: "Googlebot",
                    allow: "/",
                    disallow: "/search",
                    crawlDelay: 2,
                },
                {
                    userAgent: "OtherBot",
                    allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
                    disallow: ["/admin", "/login"],
                    crawlDelay: 2,
                },
                {
                    userAgent: "*",
                    allow: "/",
                    disallow: "/search",
                    crawlDelay: 10,
                    cleanParam: "ref /articles/",
                },
            ],
            sitemap: "http://example.com/sitemap.xml",
            host: "http://example.com",
        }
    }
}

module.exports = state

