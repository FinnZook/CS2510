class DrawComponent2 extends Component {
    draw(ctx) {

        let position = this.transform.position;

        ctx.save();
        ctx.translate(position.x, position.y);


        ctx.beginPath();
        ctx.moveTo(250, 400);
        ctx.lineTo(850, 400);
        ctx.lineTo(850, 500);
        ctx.lineTo(250, 500);

        

        ctx.fillStyle = "brown";
        ctx.fill();

        ctx.restore();
    }
}