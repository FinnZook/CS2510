class Input
{

    /**
     * @type{string[]}
     */



    static keysDown = [];


    /**
     * 
     * @param {KeyboardEvent} event
     */

    static keydown(event)
    {
        if (!Input.keysDown.includes(event.code))
        {
            Input.keysDown.push(event.code);
        }
    }


    /**
     * 
     * @param {KeyboardEvent} event 
 */



    static keyup(event)
    {
        let index = Input.keysDown.indexOf(event.code);
        Input.keysDown.splice(index, 1);
    }

}