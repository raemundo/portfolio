export function basicHead(title: string, description: string, image: string) {
    return {
        title: `${title}`,
        meta: [
            { hid: "description", name: "description", content: `${description}` },
            { hid: "og:image", name: "og:image", content: `${image}` },
            { hid: "og:title", name: "og:title", content: `${title}` },
            {
                hid: "og:description",
                name: "og:description",
                content: `${description}`,
            },
            { hid: "twitter:title", name: "twitter:title", content: `${title}` },
            { hid: "twitter:image", name: "twitter:image", content: `${image}` },
            {
                hid: "twitter:description",
                name: "twitter:description",
                content: `${description}`,
            },
            { hid: "DC.title", name: "DC.title", content: `${title}` },
            {
                hid: "DC.description",
                name: "DC.description",
                content: `${description}`,
            },
        ],
    };
}