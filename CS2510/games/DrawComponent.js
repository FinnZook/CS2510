class DrawComponent extends Component {
    draw(ctx) {
        let position = this.transform.position;

        ctx.save();
        ctx.translate(position.x, position.y);

        ctx.beginPath();

        ctx.moveTo(-12, -30);
        ctx.lineTo(12, -30);
        ctx.lineTo(15, -18);
        ctx.lineTo(10, -15);
        ctx.lineTo(20, 0);
        ctx.lineTo(15, 25);
        ctx.lineTo(-15, 25);
        ctx.lineTo(-20, 0);
        ctx.lineTo(-10, -15);
        ctx.lineTo(-15, -18);

        ctx.fillStyle = "black";
        ctx.fill();

        ctx.restore();
    }
}