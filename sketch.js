let nn;

let segmento = [];
let inputsTester = Array(10);
let testerCont = 0;
let epochCont = 0;

//HAS THE DATA TO TRAIN
//WARNING: THE VALUES CANNOT BE FEWER THAN 0 NEITHER MORE THAN 1
let training_data = [
{
	//WHEN MY INPUTS ARE
	inputs: [1,1,1,0,1,1,1],
	//I WANT THIS OUTPUT
	outputs: [0.0]
},
{
	inputs: [0,0,1,0,0,1,0],
	outputs: [0.1]
},
{
	inputs: [1,0,1,1,1,0,1],
	outputs: [0.2]
},
{
	inputs: [1,0,1,1,0,1,1],
	outputs: [0.3]
},
{
	inputs: [0,1,1,1,0,1,0],
	outputs: [0.4]
},
{
	inputs: [1,1,0,1,0,1,1],
	outputs: [0.5]
},
{
	inputs: [1,1,0,1,1,1,1],
	outputs: [0.6]
},
{
	inputs: [1,0,1,0,0,1,0],
	outputs: [0.7]
},
{
	inputs: [1,1,1,1,1,1,1],
	outputs: [0.8]
},
{
	inputs: [1,1,1,1,0,1,1],
	outputs: [0.9]
}

]


function setup()
{
	createCanvas(600, 600);
	//CREATE MY NEURAL NETWORK VARIABLE
	//IT HAS 3 LAYERS
	// THE FIRST ONE (INPUTS) HAS 7 NEURONS (LCD SEGMENTS)
	// THE SECOND (HIDDEN LAYER) HAS 8 NEURONS
	// THE LAST (OUTPUTS) HAS 1 NEURON (WHICH WOULD VARY FROM 0 TO 0.9)
	//   IN THE OUTPUT:
	//   0.0 --> 0
	//   0.1 --> 1
	//   0.2 --> 2
	//   0.3 --> 3
	//   0.4 --> 4
	//   0.5 --> 5
	//   0.6 --> 6
	//   0.7 --> 7
	//   0.8 --> 8
	//   0.9 --> 9

	nn = new RedeNeural(7, 8, 1);
	//lr_slider = createSlider(0.01, 0.5, 0.1, 0.01);

	for (let i=0; i<10; i++)
	{
		inputsTester[i] = Array(7);

		for (let j=0; j<7; j++)
		{
			//i --> DEFINE THE INPUT INDEX
			//j --> DEFINE THE SEGMENT INDEX OF THE INPUT
			inputsTester[i][j] = training_data[i].inputs[j];
		}
	}

	for (let i=0; i<7; i++)
	{
		//CREATE THE 7 SEGMENTS OF THE LCD DISPLAY
		segmento[i] = new Segmento(i);
	}
}

function draw()
{
	background(0);

	for (let i=0; i<5000; i++)
	{
		//SELECT RANDOMLY A PAIR OF INPUT-OUTPUT FROM THE TRAINING DATA
		let data = random(training_data);
		//TRAIN THE DATA SENDING THE INPUTS AND THE TARGET OUTPUTS
		nn.train(data.inputs, data.outputs);
		//COUNT THE EPOCHS
		epochCont++;
	}

	for (let i=0; i<7; i++)
	{
		//"j" GOES FROM 0 TO 9 SO WE CAN TAKE THE REST OF DIVISION OF A COUNTER BY 10
		//"j" WILL FLOW LIKE ... 0, 1, 2, ... ,8 ,9 ,0 ,1 ,2 ...
		if (inputsTester[testerCont%10][i] == 1)
		{
			//TURN THE LCD SEGMENT LIGHT ON
			segmento[i].enabled = true;
		}
		else
		{
			//TURN THE LCD SEGMENT LIGHT OFF
			segmento[i].enabled = false;
		}
	}

	for (let i=0; i<7; i++)
	{
		//DRAW EACH SEGMENT
		segmento[i].draw();
	}

	//RETURN THE PREDICT OF ONE OF THE INPUTS TO THE VARIABLE
	//ITS "TIMES TEN" BECAUSE THE OUTPUTS VARY FROM 0 TO 0.9
	let guess = float(nn.predict(inputsTester[testerCont%10])[0])*10;

	fill(51, 51, 255);

	textSize(30);
	textAlign(CENTER);
	//PRINTS THE GUESS AND THE EPOCH
	text("Guess: " + round(100*guess)/100.0, 300, 510);
	text("Epoch: " + epochCont, 300, 550);

	//INCREMENT 1 TO THE INPUT INDEX  COUNTER (j)
	testerCont++;

	//loop() WILL RUN 2 TIMES IN A SECOND
	frameRate(2);
}

function keyPressed()
{
	if(key == ' ')
	{
		let bin = [];

		for(let i=0; i<7; i++)
		{
			if(segmento[i].enabled)
			{
				bin.push(1);
			}
			else
			{
				bin.push(0);
			}
		}

		//PRINTS IN THE CONSOLE THE PREDICT OF THE CURRENT STATE OF THE LCD
		console.log(float(nn.predict(bin)[0])*10);
	}
}