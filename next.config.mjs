// @generated: @expo/next-adapter@2.1.69
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import expoNextAdapter from "@expo/next-adapter";
import pwaManifest from '@pwa/manifest';
import robotstxt from "generate-robotstxt";
import withPWA from "next-pwa";
const { default: { withPlugins } } = await import("next-compose-plugins");
const withTmInitializer = await import("next-transpile-modules")
const withTM = withTmInitializer.default([
  "twrnc",
  "next-rn",
  // you can add other modules that need traspiling here
]);


const { default: { extra: { imageDomainList, manifest, robot } } } = await import("./app.config.js");
// const { default: { i18n } } = await import("./next-i18next.config.js");

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  // i18n,
  images: {
    disableStaticImages: true,
    domains: imageDomainList,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  pwa: {
    dest: "public",
  },
  webpack(config, options) {
    const { isServer, dev } = options
    if (!isServer && !dev) {
      // manifest generator
      const { output: manifestOutput, ...manifestOpts } = manifest;
      const m = pwaManifest.sync({
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        start_url: '/?utm_source=web_app_manifest',
        ...manifestOpts
      });
      pwaManifest.writeSync(manifestOutput, m);
      // robot.txt generator
      const { output: robotOutput, ...robotOpts } = robot;
      robotstxt(robotOpts)
        .then((content) => {
          fs.outputFile(robotOutput + "robots.txt", content, err => {
            console.log(err) // => null
          })
          return content;
        })
        .catch((error) => {
          throw error;
        });
    }

    // react native/web aliases
    config.resolve.alias["react-native"] = "react-native-web";
    config.resolve.alias["react-native-webview"] = "react-native-web-webview";
    config.resolve.alias["@fortawesome/react-native-fontawesome"] = "@fortawesome/react-fontawesome"

    // image/font loader
    config.module.rules.push({
      test: /\.(jpg|jpeg|png|svg|gif|ico|webp|jp2|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          esModule: false,
        },
      },
    });


    return config;
  },
};

export default withPlugins(
  [
    // withPWA,
    withTM,
    [expoNextAdapter.withExpo, { projectRoot: __dirname }]
  ],
  nextConfig
);

