import { environment } from '../../environments/environment';

export class Host {
    constructor(public base: string) {
        this.base = environment.host + this.base;
    }

    Make(src: string | string[]): string {
        if (Array.isArray(src)) {
            return [this.base].concat(src).join('/');
        } else {
            return this.base + '/' + src;
        }
    }
}
