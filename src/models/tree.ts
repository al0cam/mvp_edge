export const growthStages = [
  "Seed",
  "Sprout",
  "Sapling",
  "Mature Tree",
  "Fully Grown Tree",
];

type growthStage =
  {
    [key: string]: string;
  };

export const growthStageASCIIArt: growthStage = {
  "Seed": `
  _____
    *
  `,
  "Sprout": `
    v
  __|__
  `,
  "Sapling": `
   v  *
   \\ /
    |
  __|__

  `,
  "Mature Tree": `
     ,__-_.
    /~~   ~~\\
 /~~         ~~\\
{               }
 \\  _-     -_  /
   ~  \\ //  ~
       | |
       | |
     __| |__
`,

  "Fully Grown Tree": `
      ####-_
    /##   ##\\
 /##    #\\  ##\\
{#  # #/ #  #  #}
\\#  ##     ## #/
   ###\\##\\#/#/
       | |
       | |
     __| |__
`,
};
