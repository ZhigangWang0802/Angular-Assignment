import {Pipe} from "@angular/core";

/**
 * A simple string filter, since Angular does not yet have a filter pipe built in.
 */
@Pipe({
    name: 'searchFilter'
})
export class SearchFilterPipe {

    transform(value: string[], q: string) {
        if (!q || q === '') {
            return value;
        }
        return value.filter(item => -1 < item.toLowerCase().indexOf(q.toLowerCase()));
    }
}