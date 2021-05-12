export declare function getGroupedByProperty<T>(
	property: string,
	objects: T[],
	matchFound?: (a: any, b: any) => boolean
): Array<T[]>;
