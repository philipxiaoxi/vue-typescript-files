import * as HandleBars from "handlebars";
export class HandleBarsHelper {

    private static instance: typeof HandleBars = HandleBars.create();

    public static getInstance(): typeof HandleBars {
        this.handlebarHelper(this.instance);
        return this.instance;
    }

    public static handlebarHelper(instance: typeof HandleBars) {
        instance.registerHelper({
            eq: function (v1, v2) {
                return v1 === v2;
            },
            ne: function (v1, v2) {
                return v1 != v2;
            },
            lt: function (v1, v2) {
                return v1 < v2;
            },
            gt: function (v1, v2) {
                return v1 > v2;
            },
            lte: function (v1, v2) {
                return v1 <= v2;
            },
            gte: function (v1, v2) {
                return v1 >= v2;
            },
            and: function () {
                return Array.prototype.slice.call(arguments, 0, arguments.length - 1).every(Boolean);
            },
            or: function () {
                return Array.prototype.slice.call(arguments, 0, arguments.length - 1).some(Boolean);
            },
            inc: function (v1) {
                return parseInt(v1) + 1;
            },
            seq_contains: function (v1: Array<string>, v2: string) {
                for( var val of v1){
                    if (val == v2){
                        return true;
                    }
                }
                return false;
            }
        });
    }
}