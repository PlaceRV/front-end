export function randomBytes(l: number) {
	return new (class {
		toString(type: any) {
			return type + l;
		}
	})();
}
