class Collisions{
    static isCollisionPointPolygon(point, gameObject)
    {
        // move everything into world space
        let worldSpacePoints = []
        if (gameObject.getComponent(Collider) == null)
        {
            console.log("null")
        }
        for (let point of gameObject.getComponent(Collider).points)
        {
            worldSpacePoints.push(
                new Vector2(
                    gameObject.transform.getWorldMatrix().transformPoint(point).x,
                    gameObject.transform.getWorldMatrix().transformPoint(point).y
                    
                )
            )
        }



        //find the axis for projection
        for (let i = 0; i < worldSpacePoints.length; i++)
        {
            let point1 = worldSpacePoints[i]
            let point2 = worldSpacePoints[(i+1)%worldSpacePoints.length]
            let edge = point2.minus(point1)
            let axis = edge.orthogonal()


            //check for overlap
            let pointProjection = point.dot(axis)
            let polygonProjections = worldSpacePoints.map(p=>p.dot(axis))
            if (pointProjection < Math.min(...polygonProjections) || pointProjection > Math.max(...polygonProjections)){
                return false
            }

        }




        return true

    }


    static isCollisionPolygonPolygon(gameObject, gameObjectTwo)
    {
        // move everything into world space
        let worldSpacePoints = []
        for (let point of gameObject.getComponent(Collider).points)
        {
            worldSpacePoints.push(
                new Vector2(
                    gameObject.transform.getWorldMatrix().transformPoint(point).x,
                    gameObject.transform.getWorldMatrix().transformPoint(point).y
                    
                )
            )
        }



        //
        //
        // EVERYTHING BELOW THIS WILL NEED HEAVY REPOSITORY CHECKING
        //
        //









        let worldSpacePointsTwo = []
        for (let point of gameObjectTwo.getComponent(Collider).points)
        {
            worldSpacePointsTwo.push(
                new Vector2(
                    gameObjectTwo.transform.getWorldMatrix().transformPoint(point).x,
                    gameObjectTwo.transform.getWorldMatrix().transformPoint(point).y
                    
                )
            )
        }


    let axes = []
    //find the axis for projection
    for (let i = 0; i < worldSpacePoints.length; i++)
    {
        let point1 = worldSpacePoints[i]
        let point2 = worldSpacePoints[(i+1)%worldSpacePoints.length]
        let edge = point2.minus(point1).normalized()
        let axis = edge.orthogonal()
        axes.push(axis)
    }

        
        
        
        //check for overlap
        for(let i = 0; i < worldSpacePointsTwo.length; i++){
            let point1 = worldSpacePointsTwo[i]
            let point2 = worldSpacePointsTwo[(i+1)%worldSpacePointsTwo.length]
            let edge = point2.minus(point1).normalized()
            let axis = edge.orthogonal()
            axes.push(axis)
        }



        let minimumTransformVector = new Vector2(Number.MAX_VALUE, Number.MAX_VALUE)
        for(const axis of axes){
            let polygonProjections = worldSpacePoints.map(p=>p.dot(axis))
            let polygonProjectionsTwo = worldSpacePointsTwo.map(p=>p.dot(axis))
            if(Math.max(...polygonProjectionsTwo) < Math.min(...polygonProjections) || Math.min(...polygonProjectionsTwo) > Math.max(...polygonProjections))
                return false

            // else shadows overlapped
            const minOverlap = Math.min(
                    Math.max(...polygonProjectionsTwo) - Math.min(...polygonProjections),
                    Math.max(...polygonProjections) - Math.min(...polygonProjectionsTwo),
                        ) 
            if(minOverlap < minimumTransformVector.magnitude)
            {
                minimumTransformVector = axis.normalized().scaled(minOverlap)
            }
        }

        



        if (gameObject.transform.position.minus(gameObjectTwo.transform.position).dot(minimumTransformVector) > 0)
            return minimumTransformVector

        return minimumTransformVector.scaled(-1)
    }
}