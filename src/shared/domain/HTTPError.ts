export interface HTTPError {
    /**
     * get the error status
     * 
     * @return the error status
     */
    getStatus(): number;

    /**
     * get the error message
     * 
     * @return the error message
     */
    getMessage(): string;
}