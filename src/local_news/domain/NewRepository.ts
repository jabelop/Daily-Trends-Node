import { New } from "./New";

export interface NewRepository {
    /**
     * save a given new
     * 
     * @param localNew the new to save
     * 
     * @returns a Promise with true if was saved, false if there was an error
     */
    saveNew(localNew: New): Promise<boolean>;
    /**
     * get a new given their id
     * 
     * @param id the new id to look for
     * 
     * @returns a Promise with the new if exists, null if does not
     */
    getNew(id: number): Promise<New | null>;

    /**
     * get all news
     * 
     * @returns a Promise with the news if any, empty if do not
     */
    getAllNews(): Promise<New[]>;

    /**
     * delete an new if exists
     * 
     * @param id the if of the new to be deleted
     * 
     * @returns a Promise with true if the new was deleted, false if was not
     */
    deleteNew(id: number): Promise<boolean>;
}

export const NewRepository = Symbol("NewRepository");