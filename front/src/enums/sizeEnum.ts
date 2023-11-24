export enum SizeEnum {
    XSMALL = 'xsmall',
    SMALL = 'small',
    DEFAULT = 'default',
    LARGE = 'large',
}

export enum SizeNumberEnum {
    XSMALL = 16,
    SMALL = 32,
    DEFAULT = 48,
    LARGE = 64,
}

export const sizeMap: Map<SizeEnum, SizeNumberEnum> = (() => {
    const map = new Map<SizeEnum, SizeNumberEnum>();
    map.set(SizeEnum.XSMALL, SizeNumberEnum.XSMALL);
    map.set(SizeEnum.SMALL, SizeNumberEnum.SMALL);
    map.set(SizeEnum.DEFAULT, SizeNumberEnum.DEFAULT);
    map.set(SizeEnum.LARGE, SizeNumberEnum.LARGE);
    return map;
})();
