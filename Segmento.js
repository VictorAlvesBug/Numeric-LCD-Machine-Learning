function Segmento(i)
{
	this.enabled = false;
	this.index = i;
	this.stk = 50;

	switch (this.index)
	{
		case 0:
		this.pos = createVector(0, 0);
		this.size = createVector(200, this.stk);
		break;

		case 1:
		this.pos = createVector(0, 0);
		this.size = createVector(this.stk, 200);
		break;

		case 2:
		this.pos = createVector(200-this.stk, 0);
		this.size = createVector(this.stk, 200);
		break;

		case 3:
		this.pos = createVector(0, 200-this.stk/2);
		this.size = createVector(200, this.stk);
		break;

		case 4:
		this.pos = createVector(0, 200);
		this.size = createVector(this.stk, 200);
		break;

		case 5:
		this.pos = createVector(200-this.stk, 200);
		this.size = createVector(this.stk, 200);
		break;

		case 6:
		this.pos = createVector(0, 400-this.stk);
		this.size = createVector(200, this.stk);
		break;
	}

	this.pos.x += 200;
	this.pos.y += 75;

	this.click = function()
	{
		if(mouseX > this.pos.x && mouseX < this.pos.x+this.size.x && 
		   mouseY > this.pos.y && mouseY < this.pos.y+this.size.y)
		{
			this.enabled = !this.enabled;
			delayClick = 0;
		}
	}

	this.draw = function()
	{
		if (this.enabled)
		{
			fill(255, 0, 0);
		}
		else
		{
			fill(192);
		}

		noStroke();

		let px = this.pos.x;
		let py = this.pos.y;
		let fx = this.pos.x+this.size.x;
		let fy = this.pos.y+this.size.y;

		beginShape();
		switch (this.index)
		{
			case 0:
			vertex(px, py);
			vertex(fx, py);
			vertex(fx-this.stk, py+this.stk);
			vertex(px+this.stk, py+this.stk);
			break;

			case 1:
			vertex(px, py);
			vertex(px, fy);
			vertex(px+this.stk, fy-this.stk/2);
			vertex(px+this.stk, py+this.stk);
			break;

			case 2:
			vertex(fx, py);
			vertex(px, py+this.stk);
			vertex(px, fy-this.stk/2);
			vertex(fx, fy);
			break;

			case 3:
			vertex(px, py+this.stk/2);
			vertex(px+this.stk, py);
			vertex(fx-this.stk, py);
			vertex(fx, py+this.stk/2);
			vertex(fx-this.stk, fy);
			vertex(px+this.stk, fy);
			break;

			case 4:
			vertex(px, py);
			vertex(px, fy);
			vertex(px+this.stk, fy-this.stk);
			vertex(px+this.stk, py+this.stk/2);
			break;

			case 5:
			vertex(fx, py);
			vertex(px, py+this.stk/2);
			vertex(px, fy-this.stk);
			vertex(fx, fy);
			break;

			case 6:
			vertex(px, py+this.stk);
			vertex(px+this.stk, py);
			vertex(fx-this.stk, py);
			vertex(fx, fy);
			break;
		}
		endShape(CLOSE);
	}
}