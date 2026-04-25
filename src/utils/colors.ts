export const COLORS = ['#FF0000', '#006400', '#FFA500', '#005BAC', '#800080'] as const;

export type Color = (typeof COLORS)[number];

export const getRandomColor = (): Color => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
};