class Vector2{
    
    
    /**
     * @type{Number}
     */
    
    x


    /**
     * @type{Number}
     */
    y

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */

        constructor(x, y){
            this.x = x;
            this.y = y;
        }
    
    clone(){
        return new Vector2(this.x, this.y)
    }
}