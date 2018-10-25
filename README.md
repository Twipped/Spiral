# Spiral
### The bio-cycle tracker for all humans

---

Spiral is a mobile application built in React Native for tracking fluctuations in physical
symptoms and mental state which may be tied to cyclical fluctuations in hormones.  In other
words, Spiral is a period tracker built for anyone, regardless of gender, designed to avoid
dysphoric triggers via gendered language and visuals. It attempts to assume nothing about
the behavior of the user's body, and only provides tools to collect and analyze data about
their body.

This application is still in very early development and is iterating fairly quickly.

## Launching in Development

Spiral is constructed in React Native, _without_ the use of the Expo runtime. This means you must have Node.js and the `react-native` utility installed to launch the app.

**Setup**
From a shell command inside the project folder, execute `npm install` to install all the
needed dependencies. Once that is complete, run `npm start` to initialize the React Native
bundler. You must keep this process running to use the app in the iOS or Android simulators.

You may now open the XCode project in the `ios` folder, and run it from there, or open another
terminal shell and run `react-native run-ios` from inside the project folder root. This will
build the application and launch the iOS simulator.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
