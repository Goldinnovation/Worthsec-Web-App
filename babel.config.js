module.exports = {
    presets: ['next/babel',],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            "@assets/*": ["public/assets/*"],
            "@components/*": ["src/components/*"]
          },
        },
      ],
    ],
  };
  