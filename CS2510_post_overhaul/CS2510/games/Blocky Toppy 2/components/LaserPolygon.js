class LaserPolygon extends Component{
    draw(ctx){
        
        let position = this.transform.position;

        ctx.save();
        ctx.translate(position.x, position.y);

        ctx.beginPath();

        ctx.lineTo(-5, -15);
        ctx.lineTo(5, -15);
        ctx.lineTo(5, 15);
        ctx.lineTo(-5, 15);


        ctx.fillStyle = "green";
        ctx.fill();

        ctx.restore();


    }
}