import { New } from './New';
export class NewValidator {

    constructor(private readonly newData: New) {
    }

    validate(): boolean {

        return this.validateTitle() && this.validateContent() && this.validateImage();
    }

    validateTitle(): boolean {
        if (
            this.newData.title &&
            (typeof this.newData.title !== 'string' || this.newData.title.length > 120)
        )
            return false;
        return true;
    }

    validateImage(): boolean {
        if (
            this.newData.image &&
            (typeof this.newData.image !== 'string' || this.newData.image.length > 250)
        )
            return false;
        return true;
    }

    validateContent(): boolean {
        if (
            !this.newData.content ||
            typeof this.newData.content !== 'string'
        )

            return false;
        return true;
    }
}