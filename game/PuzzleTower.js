
class PuzzleTower {

	/**
	 * @param {PuzzleGame} PuzzleGame
	 * */
	constructor(PuzzleGame) {
		this.PuzzleGame = PuzzleGame;

		this.towerGroup = new THREE.Group();
		this.PuzzleGame.scene.add(this.towerGroup);

		this.currentMode = MODE_LOADING;

		this.resettedStats = {
			score:0,
			matches:0,
			rowsCreated:0,
			chainCount:0,
			highestChain:0
		};
		this.stats = Object.assign({},this.resettedStats);

		//Timer Objects
		this.pushTimeoutObj = null;

		window.onblur = function(){
			if(this.hasControl && !this.PuzzleGame.paused){
				this.pauseGame();
			}
		}.bind(this);


		this.clearLineHeight = -5;
		this.tube = this.generateTube();
		this.towerGroup.add(this.tube);
		this.depthFilter = this.generateCylinderDepthFilter();
		this.towerGroup.add(this.depthFilter);

		this.gameBoard = new THREE.Object3D();
		this.nextRow = new THREE.Object3D();
		this.cursorObj = new THREE.Object3D();

		this.setGameMode(MODE_NONE);

		this.debugMapNumber = 1;

		this.initTouch();
	}

	//checkTimerQueue(){
	//	console.log(PuzzleTimer.timers[CAT_GAME]);
	//}

	changeMapType(mapType){
		this.mapType = mapType;
		this.resetGameVariables();

		this.towerGroup.remove(this.tube);
		this.tube = this.generateTube();
		this.towerGroup.add(this.tube);

		if(this.PuzzleGame.loaded){
			this.PuzzleGame.tubeTexture.repeat.set(this.boardWidth, this.boardHeight);
		}

		this.towerGroup.remove(this.depthFilter);
		this.depthFilter = this.generateCylinderDepthFilter();
		this.towerGroup.add(this.depthFilter);
	}

	initTouch(){
		this.touchTimer = null;
		this.xTouchChain = 0;
		this.yTouchChain = 0;

	}

	touchStart(event){
		let sThis = this;
		event.preventDefault();

		if(this.PuzzleGame.paused){
			this.pauseGame();
			return;
		}

		if ( event.touches.length === 1 ) {
			if (this.touchTimer === null) {
				this.touchTimer = setTimeout(function () {
					sThis.touchTimer = null;
				}, 200);
			} else {
				clearTimeout(this.touchTimer);
				this.touchTimer = null;
				if(Math.abs(this.xTouchChain) < 10 &&  Math.abs(this.yTouchChain) < 10) {
					this.swapSelectedBlocks();
				}
			}

			this.lastXTouch = event.touches[ 0 ].pageX;
			this.lastYTouch = event.touches[ 0 ].pageY;
			this.xTouchChain = 0;
			this.yTouchChain = 0;
		}
	}

	/**
	 * @param event
	 */
	touchMove(event){
		event.preventDefault();

		if ( event.touches.length === 1 ) {
			let mouseX = event.touches[ 0 ].pageX;
			let mouseY = event.touches[ 0 ].pageY;
			let xDelta = ( mouseX - this.lastXTouch );
			let yDelta = ( mouseY - this.lastYTouch );
			this.lastXTouch = mouseX;
			this.lastYTouch = mouseY;
			this.xTouchChain += xDelta;
			this.yTouchChain += yDelta;
			if(this.xTouchChain < -30){
				this.adjustSelector('left');
				this.xTouchChain = 0;
			}else if(this.xTouchChain > 30){
				this.adjustSelector('right');
				this.xTouchChain = 0;
			}
			if(this.yTouchChain < -30){
				this.adjustSelector('up');
				this.yTouchChain = 0;
			}else if(this.yTouchChain > 30){
				this.adjustSelector('down');
				this.yTouchChain = 0;
			}
		}
	}

	closeAndSetGameMode(newMode) {
		this.currentMode = MODE_CLOSED;
		this.closeTube(this.setGameMode.bind(this, newMode));
	}

	setGameMode(newMode) {
		this.gameBoard.visible = false;
		this.cursorObj.visible = false;
		this.nextRow.visible = false;
		this.depthFilter.visible = false;

		this.currentMode = newMode;
		switch (newMode) {
			case MODE_NONE:
				this.openTubeFull();
				break;
			case MODE_ENDLESS:

				this.openTube();
				//let sThis = this;

				/*setTimeout(function(){
					sThis.gameBoard.visible = true;
					sThis.cursorObj.visible = true;
					sThis.nextRow.visible = true;
					sThis.depthFilter.visible = true;
					sThis.resetGame();
					new TWEEN.Tween(sThis.depthFilter.material).to({
						opacity:0.5
					},2000).easing(TWEEN.Easing.Exponential.Out).start();
				},1000);
				*/

				new PuzzleTimer(function(){
					this.gameBoard.visible = true;
					this.cursorObj.visible = true;
					this.nextRow.visible = true;
					this.depthFilter.visible = true;
					this.resetGame();
					new TWEEN.Tween(this.depthFilter.material).to({
						opacity:0.5
					},2000).easing(TWEEN.Easing.Exponential.Out).start();
				},1000,CAT_GAME,this);

				break;
		}
	}

	makeHarder(){
		if (this.pushDelay > 0) {
			if(this.mapType === MAP_3D) {
				this.pushDelay = 100 - (this.stats.matches / (6 - this.difficulty));
			}else{
				this.pushDelay = 50 - (this.stats.matches / (6 - this.difficulty));
			}

			if (this.pushDelay < 0) {
				this.pushDelay = 0;
			}
		}
	}

	resetGameVariables(){

		switch(this.mapType){
			case MAP_2D:
				this.boardHeight = 13;
				this.boardWidth = 6;
				this.pushDelay = 50;
				this.blockWidth = 45;
				this.blockHeight = 45;
				this.blockDepth = 1;
				this.boardRadius = null;
				this.boardPixelWidth = (this.boardWidth) * this.blockWidth; //Also known as circumference in 3d mode!
				break;
			case MAP_3D:
				this.boardHeight = 13;
				this.boardWidth = 30;
				this.pushDelay = 100;
				this.blockWidth = 30;
				this.blockHeight = 30;
				this.blockDepth = 10;
				this.boardRadius = ((this.blockWidth - 1) * this.boardWidth) / (2 * PI);
				this.boardPixelWidth = (this.boardRadius + this.blockDepth) * 2;
				break;
		}

		//TODO:Sort these!

		this.difficulty = this.PuzzleGame.gameSettings.difficulty;
		this.startingHeight = this.PuzzleGame.gameSettings.startingHeight;

		this.animationQueue = 0;
		this.stats = Object.assign({},this.resettedStats);
		this.gameGrid = [];

		this.circlePieceSize = (TWO_PI / this.boardWidth);
		this.stackHeights = [];

		this.boardPixelHeight = (this.boardHeight) * this.blockHeight;

		this.halfBoardPixelHeight = this.boardPixelHeight / 2;

		this.hasControl = false;
		this.gameActive = false;
		this.upOffset = 0;
		this.dropDelay = 150;

		this.handicap = 5-this.difficulty;


		this.chainTimer = null;
		this.quickPush = false;
	}

	resetGame(){

		//TWEEN.removeAll();

		this.PuzzleGame.resetBlockTextures();

		this.resetGameVariables();

		if (this.hasOwnProperty('gameBoard')) {
			this.towerGroup.remove(this.gameBoard);
		}
		this.gameBoard = this.cylinder();
		this.towerGroup.add(this.gameBoard);

		this.generateNextRow();

		if (this.pushTimeoutObj !== null) {
			this.pushTimeoutObj.clear();
		}
		this.pushTimeoutObj = new PuzzleTimer(this.checkToPushBlocks,2000,CAT_GAME,this);//setTimeout(this.checkToPushBlocks.bind(this), 2000);

		if (this.hasOwnProperty('cursorObj')) {
			this.towerGroup.remove(this.cursorObj);
		}
		this.cursorObj = this.generateCursor();
		this.towerGroup.add(this.cursorObj);

		this.selectorY = Math.floor(this.boardHeight / 2);
		this.selectorX = Math.floor(this.boardWidth/2);

		this.updateCursorPos();
		
		let startingTowerAngle = this.circlePieceSize * this.selectorX - HALF_PI - (this.circlePieceSize / 2);
		if(this.mapType === MAP_2D){
			startingTowerAngle = 0;
			this.gameBoard.rotation.y = startingTowerAngle;
		}else{
			this.gameBoard.rotation.y = startingTowerAngle - PI;
		}
		this.nextRow.rotation.y = startingTowerAngle;

		let startingTowerPosition = this.updateTowerPos();
		this.gameBoard.position.y = startingTowerPosition - this.boardPixelHeight;

		this.openTube();

		new TWEEN.Tween(this.gameBoard.position).to({
			y: startingTowerPosition
		}, 1200).easing(TWEEN.Easing.Quintic.Out).delay(400).start();

		let sThis = this;
		new TWEEN.Tween(this.gameBoard.rotation).to({
			y: startingTowerAngle
		}, 1200).easing(TWEEN.Easing.Quintic.Out).delay(400).start().onComplete(function () {
			sThis.hasControl = true;
			sThis.gameActive = true;
			sThis.checkForMatches();
		});

		this.debug = new PuzzleDebug(this);
		this.debug.initDatGui();
	}

	loseAnimation(){
		this.PuzzleGame.blankOutBlockTextures();
		for (let x = 0; x < this.boardWidth; x++) {
			for (let y = 0; y < this.boardHeight; y++) {
				if (this.gameGrid[x][y] !== null) {
					//this.gameGrid[x][y].material.map = this.PuzzleGame.blankTexture;
					let delay = 500;
					if (this.gameGrid[x][this.boardHeight - 1] !== null) {
						delay = 2000;
						continue;
					}
					new TWEEN.Tween(this.gameGrid[x][y].position).to({
						y: -this.boardPixelHeight * 2.1
					}, 4000).easing(TWEEN.Easing.Exponential.Out).delay(delay).start();
				}
			}
		}
		//setTimeout(this.closeAndSetGameMode.bind(this, MODE_NONE), 2500);
		new PuzzleTimer(this.closeAndSetGameMode.bind(this, MODE_NONE),2500,CAT_GAME,this);
	}

	checkToPushBlocks(){
		if (!this.gameActive) {
			return;
		}

		let pushDelay = this.pushDelay;
		if (this.quickPush === true) {
			pushDelay = 0;
		}

		if (this.animationQueue !== 0) {
			this.pushTimeoutObj = new PuzzleTimer(this.checkToPushBlocks,pushDelay,CAT_GAME,this);//setTimeout(this.checkToPushBlocks.bind(this), pushDelay);
			return;
		}

		if (this.pushTowerUp()) {
			this.pushTimeoutObj = new PuzzleTimer(this.checkToPushBlocks,pushDelay,CAT_GAME,this);//setTimeout(this.checkToPushBlocks.bind(this), pushDelay);
		}
	}

	pushTowerUp(){

		for (let tx = 0; tx < this.boardWidth; tx++) {
			if (this.gameGrid[tx][this.boardHeight - 1] !== null) {
				//YOU LOSE
				this.hasControl = false;
				this.gameActive = false;
				this.loseAnimation();
				new PuzzleTimer(() => {
					this.PuzzleGame.menu.showMenu();
					this.PuzzleGame.menu.changeMenu(this.PuzzleGame.menu.endingScreen);
					this.PuzzleGame.scoreBoard.hideScoreBoard();
					this.PuzzleGame.setFocus(FOCUS_MENU);
				},3000,CAT_GAME,this);
				return false;
			}
		}

		this.upOffset += (this.blockHeight / 100);
		if (this.upOffset > this.blockHeight) {

			for (let x = 0; x < this.boardWidth; x++) {
				for (let y = this.boardHeight - 1; y >= 0; y--) {
					if (this.gameGrid[x][y] !== null) {
						this.gameGrid[x][y].position.y = this.calcYBlockPos(y + 1);
						this.gameGrid[x][y + 1] = this.gameGrid[x][y];
						//this.gameGrid[x][y] = null;
					}
				}
			}
			for (let nx = 0; nx < this.boardWidth; nx++) {
				let block = this.generateBlockMesh(this.nextRow.children[nx].userData.blockType, nx, 0);
				this.gameBoard.add(block);
				this.gameGrid[nx][0] = block;
			}
			this.checkForMatches();
			this.generateNextRow();
			this.upOffset = 0;
			this.selectorY++;


			//this.upOffset = 0;
		}
		this.updateTowerPos();
		this.updateCursorPos();
		this.updateNextRowPos();

		return true;
	}

	generateCursor(){
		let obj = new THREE.Object3D();
		let geometry = new THREE.PlaneGeometry(this.blockWidth, this.blockHeight);

		let material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			side: THREE.DoubleSide,
			map: this.PuzzleGame.cursorTexture,
			transparent: true
		});
		let mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = -this.blockWidth / 2;
		obj.add(mesh);
		let mesh2 = new THREE.Mesh(geometry, material);
		mesh2.position.x = this.blockWidth / 2;
		obj.add(mesh2);

		if(this.mapType === MAP_3D) {
			obj.position.z = this.boardRadius + this.blockDepth;
		}else{
			obj.position.z = this.blockDepth;
		}
		return obj;
	}

	closeTube(completeFn){
		let closeDelay = 1000;
		let closeEase = TWEEN.Easing.Cubic.Out;

		new TWEEN.Tween(this.tube.children[0].position).to({y: -this.boardPixelHeight / 2}, closeDelay).easing(closeEase).start();
		if(this.mapType === MAP_3D) {
			new TWEEN.Tween(this.tube.children[0].rotation).to({y: -HALF_PI}, closeDelay).easing(closeEase).start();
		}

		new TWEEN.Tween(this.tube.children[1].position).to({y: this.boardPixelHeight / 2}, closeDelay).easing(closeEase).start();
		if(this.mapType === MAP_3D) {
			new TWEEN.Tween(this.tube.children[1].rotation).to({y: HALF_PI}, closeDelay).easing(closeEase).start();
		}

		//setTimeout(completeFn, closeDelay);
		new PuzzleTimer(completeFn,closeDelay,CAT_GAME,this);
	}

	openTube(completeFn) {
		let openDelay = 1000;
		let openEase = TWEEN.Easing.Cubic.Out;

		new TWEEN.Tween(this.tube.children[0].position).to({y: -this.boardPixelHeight + 1}, openDelay).easing(openEase).start();
		if (this.mapType === MAP_3D) {
			new TWEEN.Tween(this.tube.children[0].rotation).to({y: 0}, openDelay).easing(openEase).start();
		}

		new TWEEN.Tween(this.tube.children[1].position).to({y: this.boardPixelHeight - 1}, openDelay).easing(openEase).start();
		if(this.mapType === MAP_3D) {
			new TWEEN.Tween(this.tube.children[1].rotation).to({y: 0}, openDelay).easing(openEase).start();
		}

		//setTimeout(completeFn, openDelay);
		new PuzzleTimer(completeFn,openDelay,CAT_GAME,this);
	}

	openTubeFull(completeFn){
		let openDelay = 1000;
		let openEase = TWEEN.Easing.Cubic.Out;

		new TWEEN.Tween(this.tube.children[0].position).to({y: -this.boardPixelHeight * 2}, openDelay).easing(openEase).start();
		if(this.mapType === MAP_3D) {
			new TWEEN.Tween(this.tube.children[0].rotation).to({y: HALF_PI}, openDelay).easing(openEase).start();
		}

		new TWEEN.Tween(this.tube.children[1].position).to({y: this.boardPixelHeight * 2}, openDelay).easing(openEase).start();
		if(this.mapType === MAP_3D) {
			new TWEEN.Tween(this.tube.children[1].rotation).to({y: -HALF_PI}, openDelay).easing(openEase).start();
		}

		//setTimeout(completeFn, openDelay);
		new PuzzleTimer(completeFn,openDelay,CAT_GAME,this);
	}

	generateTube(){
		let obj = new THREE.Object3D();
		let material = null;
		let tube = null;
		let tube2 = null;

		if(this.mapType === MAP_3D){
			material = new THREE.MeshBasicMaterial({color: 0x311B92, side: THREE.DoubleSide, map: this.PuzzleGame.tubeTexture});
			let r = this.boardRadius + this.blockDepth / 2 + 5;
			let geometry = new THREE.CylinderGeometry(r, r, this.boardPixelHeight, this.boardWidth, 1, false);
			tube = new THREE.Mesh(geometry, material);
			tube.position.y = -(this.boardPixelHeight*2);
			tube.rotation.y = -HALF_PI;

			tube2 = new THREE.Mesh(geometry, material);
			tube2.position.y = (this.boardPixelHeight*2);
			tube2.rotation.y = HALF_PI;
		}else{
			material = new THREE.MeshBasicMaterial({color: 0xB71C1C, side: THREE.DoubleSide, map: this.PuzzleGame.tubeTexture});
			let geometry = new THREE.BoxGeometry(this.boardPixelWidth,this.boardPixelHeight,this.blockDepth+10);
			tube = new THREE.Mesh(geometry, material);
			tube.position.y = -(this.boardPixelHeight*2);

			tube2 = new THREE.Mesh(geometry, material);
			tube2.position.y = (this.boardPixelHeight*2);
		}

		obj.add(tube);
		obj.add(tube2);

		return obj;
	}

	generateCylinderDepthFilter(){
		let material = new THREE.MeshBasicMaterial({
			color: 0x000000,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0
		});

		let width = this.boardPixelWidth;
		let geometry = new THREE.PlaneGeometry(width, this.boardPixelHeight);
		return new THREE.Mesh(geometry, material);
	}

	pauseGame(){
		if(this.PuzzleGame.menu.inAnimation){
			return;
		}
		if(this.PuzzleGame.paused){
			this.hidePause();
			this.PuzzleGame.setFocus(FOCUS_TOWER);
			//new TWEEN.Tween(this.towerGroup.position).to({
			//	z: 0
			//}, 500).easing(TWEEN.Easing.Quadratic.Out).start();
			PuzzleTimer.resumeAllInCategory(CAT_GAME);
			this.openTube();
		}else{
			this.showPause();
			this.PuzzleGame.setFocus(FOCUS_MENU);
			PuzzleTimer.pauseAllInCategory(CAT_GAME);
			//new TWEEN.Tween(this.towerGroup.position).to({
			//	z: -200
			//}, 500).easing(TWEEN.Easing.Quadratic.Out).start();
			this.closeTube();
		}
		this.PuzzleGame.paused = !this.PuzzleGame.paused;
	}

	showPause(){
		this.PuzzleGame.menu.changeMenu(this.PuzzleGame.menu.pauseMenuOptions);
		this.PuzzleGame.menu.showMenu();
	}

	hidePause(){
		this.PuzzleGame.menu.hideMenu();
	}

	keyPress(event){
		if (!this.hasControl || (this.PuzzleGame.paused && event.keyCode !== PuzzleGame.KEY.ESCAPE)) {
			return;
		}

		//console.log(event.keyCode);
		switch (event.keyCode) {
			case 88: //X
				//this.destroyBlock(this.selectorX,this.selectorY);
				this.quickPush = true;
				break;
			case PuzzleGame.KEY.ESCAPE:
				this.pauseGame();
				break;
			case PuzzleGame.KEY.SPACE:
				this.swapSelectedBlocks();
				break;
			case PuzzleGame.KEY.UP:
				this.adjustSelector('up');
				break;
			case PuzzleGame.KEY.DOWN:
				this.adjustSelector('down');
				break;
			case PuzzleGame.KEY.LEFT:
				this.adjustSelector('left');
				break;
			case PuzzleGame.KEY.RIGHT:
				this.adjustSelector('right');
				break;
		}
	}

	keyUp(){
		this.quickPush = false;
	}

	swapSelectedBlocks(){
		this.swapBlocks(this.selectorX, this.selectorY, this.selectorX - 1);
	}

	checkForMatches(){

		if (!this.hasControl) {
			return;
		}

		//combo being number of matches that happened in the same check
		let comboCount = 0;

		let blocksToBeDestroyed = [];
		for (let y = 0; y < this.boardHeight; y++) {
			for (let x = 0; x < this.boardWidth; x++) {
				if (this.gameGrid[x][y] === null || this.gameGrid[x][y].userData.locked) {
					continue;
				}

				let typeToMatch = this.gameGrid[x][y].userData.blockType;
				let matchChainX = [x];
				let xToTest = x + 1;
				if (xToTest === this.boardWidth) {
					if(this.mapType === MAP_3D) {
						xToTest = 0;
					}else{
						xToTest = x;
					}
				}

				while (xToTest !== x && this.gameGrid[xToTest][y] !== null && !this.gameGrid[xToTest][y].userData.locked && !this.gameGrid[xToTest][y].userData.alreadyMatchedX) {
					let nextType = this.gameGrid[xToTest][y].userData.blockType;
					if (nextType !== typeToMatch) {
						//no more matches!
						break;
					}
					matchChainX.push(xToTest);
					xToTest++;
					if (xToTest === this.boardWidth) {
						if(this.mapType === MAP_3D) {
							xToTest = 0;
						}else{
							break; //Only X rollover on 3D
						}
					}
				}

				if (matchChainX.length >= 3) {
					this.stats.matches++;
					comboCount++;
					for (let i = 0; i < matchChainX.length; i++) {
						this.gameGrid[matchChainX[i]][y].userData.alreadyMatchedX = true;
						blocksToBeDestroyed.push({x: matchChainX[i], y: y});
					}
				}
				matchChainX = [];

				let matchChainY = [y];
				let yToTest = y + 1;
				if (yToTest === this.boardHeight) {
					continue; // No Y rollover!
				}

				while (yToTest !== y && this.gameGrid[x][yToTest] !== null && !this.gameGrid[x][yToTest].userData.locked && !this.gameGrid[x][yToTest].userData.alreadyMatchedY) {
					let nextType = this.gameGrid[x][yToTest].userData.blockType;
					if (nextType !== typeToMatch) {
						//no more matches!
						break;
					}
					matchChainY.push(yToTest);
					yToTest++;
					if (yToTest === this.boardHeight) {
						break; // No Y rollover!
					}
				}

				if (matchChainY.length >= 3) {
					this.stats.matches++;
					comboCount++;
					for (let i = 0; i < matchChainY.length; i++) {
						this.gameGrid[x][matchChainY[i]].userData.alreadyMatchedY = true;
						blocksToBeDestroyed.push({x: x, y: matchChainY[i]});
					}
				}
				matchChainY = [];
			}
		}

		if (comboCount > 1) {
			//console.log("x"+comboCount+"!");
		}


		if (blocksToBeDestroyed.length > 0) {
			this.stats.chainCount++;
			if(this.stats.chainCount > this.stats.highestChain){
				this.stats.highestChain = this.stats.chainCount;
			}

			if (this.chainTimer !== null) {
				this.chainTimer.clear();
			}
			this.chainTimer = new PuzzleTimer(this.resetChain,this.dropDelay + 600,CAT_GAME,this);//setTimeout(this.resetChain.bind(this), this.dropDelay + 600);

			if (this.stats.chainCount > 1) {
				console.log('CHAIN ' + this.stats.chainCount);
			}
		}

		for (let d = 0; d < blocksToBeDestroyed.length; d++) {
			this.stats.score += comboCount * this.stats.chainCount;
			this.makeHarder();
			this.destroyBlock(blocksToBeDestroyed[d].x, blocksToBeDestroyed[d].y);
		}
	}

	resetChain(){
		this.stats.chainCount = 0;
		this.chainTimer = null;
	}

	swapBlocks(x, y, x2){

		if (x2 === -1) {
			x2 = this.boardWidth - 1;
		}

		let block1 = this.gameGrid[x][y];
		let block2 = this.gameGrid[x2][y];

		if ((block1 !== null && block1.userData.locked ) || (block2 !== null && block2.userData.locked)) {
			return;
		}

		let sThis = this;
		if (block1 !== null) {
			this.animationQueue++;
			new TWEEN.Tween(block1.position).to({
				x: this.calcXBlockPos(x2),
				z: this.calcZBlockPos(x2)
			}, 50).easing(TWEEN.Easing.Bounce.Out).start().onComplete(function () {
				sThis.animationQueue--;
			});
			block1.rotation.y = this.calcRBlockPos(x2);
		}

		if (block2 !== null) {
			this.animationQueue++;
			new TWEEN.Tween(block2.position).to({
				x: this.calcXBlockPos(x),
				z: this.calcZBlockPos(x)
			}, 50).easing(TWEEN.Easing.Bounce.Out).start().onComplete(function () {
				sThis.animationQueue--;
			});
			block2.rotation.y = this.calcRBlockPos(x);
		}

		this.gameGrid[x][y] = block2;
		this.gameGrid[x2][y] = block1;

		if (block1 !== null && block2 === null) {
			if (y - 1 >= 0 && this.gameGrid[x2][y - 1] === null) {
				this.lockBlocksStartingAtPoint(x2, y);
				this.animationQueue++;
				//setTimeout(this.dropBlocksStartingAtPoint.bind(this, x2, y), this.dropDelay);
				new PuzzleTimer(this.dropBlocksStartingAtPoint.bind(this, x2, y),this.dropDelay,CAT_GAME,this);
			}
			this.lockBlocksStartingAtPoint(x, y + 1);
			this.animationQueue++;
			//setTimeout(this.dropBlocksStartingAtPoint.bind(this, x, y + 1), this.dropDelay);
			new PuzzleTimer(this.dropBlocksStartingAtPoint.bind(this, x, y + 1),this.dropDelay,CAT_GAME,this);
		}

		else if (block2 !== null && block1 === null) {
			if (y - 1 >= 0 && this.gameGrid[x][y - 1] === null) {
				this.lockBlocksStartingAtPoint(x, y);
				this.animationQueue++;
				//setTimeout(this.dropBlocksStartingAtPoint.bind(this, x, y), this.dropDelay);
				new PuzzleTimer(this.dropBlocksStartingAtPoint.bind(this, x, y),this.dropDelay,CAT_GAME,this);
			}
			this.lockBlocksStartingAtPoint(x2, y + 1);
			this.animationQueue++;
			//setTimeout(this.dropBlocksStartingAtPoint.bind(this, x2, y + 1), this.dropDelay);
			new PuzzleTimer(this.dropBlocksStartingAtPoint.bind(this, x2, y + 1),this.dropDelay,CAT_GAME,this);
		}

		this.checkForMatches();

		//this.checkDropBlocks();
	}

	destroyBlock(x, y){
		if (this.gameGrid[x][y] === null || this.gameGrid[x][y].userData.locked) {
			return;
		}
		this.animationQueue++;

		this.gameGrid[x][y].userData.locked = true;
		this.gameGrid[x][y].userData.exploding = true;
		//this.gameGrid[x][y].material.map = this.explodeTexture;

		/*
		 new TWEEN.Tween(this.gameGrid[x][y].scale).to({
		 x:0.7,
		 y:0.7
		 },800).easing( TWEEN.Easing.Elastic.Out).start();
		 */

		//setTimeout(this.deleteBlock.bind(this, x, y), 750);
		new PuzzleTimer(this.deleteBlock.bind(this, x, y),750,CAT_GAME,this);
	}

	lockBlocksStartingAtPoint(x, y){
		for (let i = y; i < this.boardHeight; i++) {
			if (this.gameGrid[x][i] !== null && !this.gameGrid[x][i].userData.exploding) {
				this.gameGrid[x][i].userData.locked = true;
				//Set texture to a debug "lock/dropping" texture.
				//this.gameGrid[x][i].material.map = this.lockTexture;
			} else {
				return;
			}
		}
	}

	deleteBlock(x, y){
		this.gameGrid[x][y].userData.exploding = false;
		this.gameBoard.remove(this.gameGrid[x][y]);
		this.gameGrid[x][y] = null;
		this.animationQueue--;

		this.lockBlocksStartingAtPoint(x, y + 1);
		this.animationQueue++;
		//setTimeout(this.dropBlocksStartingAtPoint.bind(this, x, y + 1), this.dropDelay);
		new PuzzleTimer(this.dropBlocksStartingAtPoint.bind(this, x, y + 1),this.dropDelay,CAT_GAME,this);
	}

	dropBlocksStartingAtPoint(x, y){
		this.animationQueue--;
		let stillGottaFall = true;
		for (let i = y; i < this.boardHeight; i++) {
			if (this.gameGrid[x][i] !== null && !this.gameGrid[x][i].userData.exploding) {
				//You moved a block under this block about to fall.
				if (this.gameGrid[x][i - 1] !== null) {
					this.gameGrid[x][i].userData.locked = false;
					//Set texture back to normal, non debug texture.
					//this.gameGrid[x][i].material.map = this.blockTextures[this.gameGrid[x][i].userData.blockType];
					stillGottaFall = false;
					continue;
				}
				let sThis = this;
				this.animationQueue++;
				new TWEEN.Tween(this.gameGrid[x][i].position).to({y: this.calcYBlockPos(i - 1)}, 200).easing(TWEEN.Easing.Bounce.Out).start().onComplete(function () {
					sThis.animationQueue--;
				});
				this.gameGrid[x][i - 1] = this.gameGrid[x][i];
				this.gameGrid[x][i] = null;
			} else {
				///stoooop!
				break;
			}
		}
		if (stillGottaFall) {
			if (y - 1 >= 0) {
				this.animationQueue++;
				this.dropBlocksStartingAtPoint(x, y - 1);
			}
		} else {
			this.checkForMatches();
		}
	}

	adjustSelector(direction){
		switch (direction) {
			case 'up':
				this.selectorY++;
				break;
			case 'down':
				this.selectorY--;
				break;
			case 'left':
				if(this.mapType === MAP_3D){
					this.selectorX++;
					if (this.selectorX >= this.boardWidth) {
						this.gameBoard.rotation.y = this.nextRow.rotation.y = this.circlePieceSize * -1 - HALF_PI - (this.circlePieceSize / 2)
					}
				}else{
					this.selectorX--;
				}
				break;
			case 'right':
				if(this.mapType === MAP_3D) {
					this.selectorX--;
					if (this.selectorX < 0) {
						this.gameBoard.rotation.y = this.nextRow.rotation.y = this.circlePieceSize * this.boardWidth - HALF_PI - (this.circlePieceSize / 2);
					}
				}else{
					this.selectorX++;
				}
				break;
		}
		if (this.selectorY >= this.boardHeight) {
			this.selectorY = this.boardHeight - 1;
		}
		if (this.selectorY < 0) {
			this.selectorY = 0
		}

		if(this.mapType === MAP_3D){
			if (this.selectorX >= this.boardWidth) {
				this.selectorX = 0;
			}

			if (this.selectorX < 0) {
				this.selectorX = this.boardWidth - 1;
			}

			this.focusCameraOnSelection();
		}else{
			if (this.selectorX >= this.boardWidth) {
				this.selectorX = this.boardWidth - 1;
			}

			if (this.selectorX < 1) {
				this.selectorX = 1;
			}

			this.updateCursorPos();
			this.gameBoard.rotation.y = 0;
			this.nextRow.rotation.y = 0;
		}
	}

	focusCameraOnSelection(){
		let newAngle = this.circlePieceSize * this.selectorX - HALF_PI - (this.circlePieceSize / 2);

		new TWEEN.Tween(this.gameBoard.rotation).to({
			//x: this.circlePieceSize * this.selectorY,
			y: newAngle
			//z: 0
		}, 200).easing(TWEEN.Easing.Exponential.Out).start();

		new TWEEN.Tween(this.nextRow.rotation).to({
			//x: this.circlePieceSize * this.selectorY,
			y: newAngle
			//z: 0
		}, 200).easing(TWEEN.Easing.Exponential.Out).start();

		this.updateCursorPos();
	}

	calcYBlockPos(y){
		return (y * this.blockHeight) + (this.blockHeight / 2)
	}

	calcXBlockPos(x){
		if(this.mapType === MAP_2D) {
			return ((x-(this.boardWidth/2)) * this.blockWidth)+this.blockWidth/2
		}
		return Math.cos(this.circlePieceSize * x) * this.boardRadius;
	}

	calcZBlockPos(x) {
		if(this.mapType === MAP_2D) {
			return 0;
		}
		return Math.sin(this.circlePieceSize * x) * this.boardRadius;
	}

	calcRBlockPos(x){
		if(this.mapType === MAP_2D) {
			return 0;
		}
		return -this.circlePieceSize * x + HALF_PI;
	}

	/*
	loadMap(mapFile){
		let sThis = this;
		this.PuzzleGame.fileLoader.load('maps/' + mapFile + '.txt', function (map) {
			map = map.replace(/\r\n/g, "\r");
			let rows = map.split("\r");
			let botRow = rows.length - 1;
			let mapArray = [];
			for (let y = botRow; y >= 0; y--) {
				let row = [];
				let items = rows[y].split("");
				for (let x = items.length - 1; x >= 0; x--) {
					row.push(items[x]);
				}
				mapArray.push(row);
			}
			sThis.resetGame(mapArray);
		});
	}
	*/

	generateNextRow(){
		if (this.hasOwnProperty('nextRow')) {
			this.towerGroup.remove(this.nextRow);
		}

		let colorPool = [];
		let allColors = Object.keys(this.PuzzleGame.blockColors);
		for (let c = 0; c < allColors.length - this.handicap; c++) {
			colorPool.push(allColors[c]);
		}

		this.nextRow = new THREE.Object3D();
		let meshes = this.generateNextRowMeshArray(colorPool);
		for (let i in meshes) {
			this.nextRow.add(meshes[i]);
		}
		this.towerGroup.add(this.nextRow);
		this.updateNextRowPos();
		if(this.mapType === MAP_3D) {
			this.nextRow.rotation.y = this.circlePieceSize * this.selectorX - HALF_PI - (this.circlePieceSize / 2);
		}else{
			this.nextRow.rotation.y = 0;
		}
		this.stats.rowsCreated++;
	}

	generateNextRowMeshArray(colorPoolIn){
		let meshes = [];
		let geometry = new THREE.BoxGeometry(this.blockWidth, this.blockHeight, this.blockDepth);
		//let keys = Object.keys(this.blockTextures);

		//Preload the array with nulls
		for (let x1 = 0; x1 < this.boardWidth; x1++) {
			meshes[x1] = null;
		}

		for (let x = 0; x < this.boardWidth; x++) {

			let colorPool = colorPoolIn.slice(0);
			let lastXType = '';
			let lastYType = '';

			for (let i = -2; i <= 2; i++) {

				if (i === 0) {
					continue;
				}

				let nextXBlock = meshes[(x - i + this.boardWidth) % this.boardWidth];

				if (nextXBlock !== null) {
					let xType = nextXBlock.userData.blockType;
					let xPos = colorPool.indexOf(xType);
					if (xType === lastXType && xPos !== -1 && colorPool.length > 1) {
						colorPool.splice(xPos, 1);
					}
					lastXType = xType;
				}

				if (i < 0) {
					continue;
				}

				let nextYBlock = this.gameGrid[x][i - 1];
				if (nextYBlock !== null) {
					let yType = nextYBlock.userData.blockType;
					let yPos = colorPool.indexOf(yType);
					if (yType === lastYType && yPos !== -1 && colorPool.length > 1) {
						colorPool.splice(yPos, 1);
					}
					lastYType = yType;
				}

			}

			let blockType = colorPool[Math.floor(Math.random() * colorPool.length)];

			//let adjustedColor = new THREE.Color(this.blockColors[blockType]);
			//adjustedColor.add( new THREE.Color(0x505050));
			//let faceMaterial = new THREE.MeshBasicMaterial({color: adjustedColor,map:this.blockTextures[blockType]});
			//let sideMaterial = new THREE.MeshBasicMaterial({color: adjustedColor,map:this.blockSideTexture});
			//let topMaterial = new THREE.MeshBasicMaterial({color: adjustedColor,map:this.blockTopTexture});
			let material = this.PuzzleGame.nextRowBlockMaterials[blockType];
			/*new THREE.MultiMaterial([
			 sideMaterial,   //right
			 sideMaterial,   //left
			 topMaterial,   //top
			 topMaterial,   //bottom
			 faceMaterial,   //back
			 faceMaterial    //front
			 ]);*/

			let mesh = new THREE.Mesh(geometry, material);
			//mesh.userData.color = mesh.material.color.getHex();
			mesh.userData.blockType = blockType;
			mesh.position.x = this.calcXBlockPos(x);
			mesh.position.y = this.calcYBlockPos(0);
			mesh.position.z = this.calcZBlockPos(x);
			mesh.rotation.y = this.calcRBlockPos(x);
			meshes[x] = mesh;
		}
		return meshes;
	}

	generateBlockMesh(blockType, x, y){
		let geometry = new THREE.BoxGeometry(this.blockWidth, this.blockHeight, this.blockDepth);

		/*
		 let faceMaterial = new THREE.MeshBasicMaterial({color: this.blockColors[blockType],map:this.blockTextures[blockType]});
		 let sideMaterial = new THREE.MeshBasicMaterial({color: this.blockColors[blockType],map:this.blockSideTexture});
		 let topMaterial = new THREE.MeshBasicMaterial({color: this.blockColors[blockType],map:this.blockTopTexture});
		 let material = new THREE.MultiMaterial([
		 sideMaterial,   //right
		 sideMaterial,   //left
		 topMaterial,   //top
		 topMaterial,   //bottom
		 faceMaterial,   //back
		 faceMaterial    //front
		 ]);
		 */

		let mesh = new THREE.Mesh(geometry, this.PuzzleGame.blockMaterials[blockType]);
		//mesh.userData.color = mesh.material.color.getHex();

		mesh.userData.blockType = blockType;
		mesh.userData.locked = false;
		mesh.userData.exploding = false;
		//Used to prevent double counting when finding matches.
		mesh.userData.alreadyMatchedX = false;
		mesh.userData.alreadyMatchedY = false;

		mesh.position.x = this.calcXBlockPos(x);
		mesh.position.y = this.calcYBlockPos(y);
		mesh.position.z = this.calcZBlockPos(x);

		mesh.rotation.y = this.calcRBlockPos(x);

		return mesh;
	}

	generateMap(colorPoolIn){
		let grid = [];
		for (let gx = 0; gx < this.boardWidth; gx++) {
			let column = [];
			for (let gy = 0; gy < this.boardHeight; gy++) {
				column.push(null);
			}
			grid.push(column);
		}

		for (let x = 0; x < this.boardWidth; x++) {
			for (let y = 0; y < this.boardHeight; y++) {

				if (y >= this.startingHeight) {
					grid[x][y] = null;
					continue;
				}

				let colorPool = colorPoolIn.slice(0);
				let lastXType = '';
				let lastYType = '';

				for (let i = -2; i <= 2; i++) {
					if (i === 0) {
						continue;
					}

					let nextXBlock = grid[(x - i + this.boardWidth) % this.boardWidth][y];

					if (nextXBlock !== null) {
						let xType = nextXBlock;
						let xPos = colorPool.indexOf(xType);
						if (xType === lastXType && xPos !== -1 && colorPool.length > 1) {
							colorPool.splice(xPos, 1);
						}
						lastXType = xType;
					}
					let nextYBlock = grid[x][(y - i + this.boardHeight) % this.boardHeight];

					if (nextYBlock !== null) {
						let yType = nextYBlock;
						let yPos = colorPool.indexOf(yType);
						if (yType === lastYType && yPos !== -1 && colorPool.length > 1) {
							colorPool.splice(yPos, 1);
						}
						lastYType = yType;
					}
				}
				grid[x][y] = colorPool[Math.floor(Math.random() * colorPool.length)];
			}
		}
		return grid;
	}

	cylinder(/*mapArray*/){
		let blocks = new THREE.Object3D();
		let colorPool = [];
		let allColors = Object.keys(this.PuzzleGame.blockColors);
		for (let i = 0; i < allColors.length - this.handicap; i++) {
			colorPool.push(allColors[i]);
		}

		let goodMap = this.generateMap(colorPool);

		for (let x = 0; x < this.boardWidth; x++) {
			let column = [];
			this.stackHeights[x] = this.boardHeight;
			for (let y = 0; y < this.boardHeight; y++) {

				//let invalidBlockTypes = array();

				let blockType = goodMap[x][y];//colorPool[Math.floor(Math.random()*colorPool.length)];
				//console.log('chose '+blockType);
				//console.log('==========================');

				/*
				 if(mapArray){
				 if(!mapArray[y] || !mapArray[y][x] || mapArray[y][x] == '-'){
				 column.push(null);
				 continue;
				 }
				 if(mapArray[y][x] != '?') {
				 blockType = allColors[mapArray[y][x]];
				 }
				 }else if(y>Math.floor(this.boardHeight*0.40)){
				 column.push(null);
				 continue;
				 }
				 */
				if (blockType === null) {
					column.push(null);
				} else {
					let mesh = this.generateBlockMesh(blockType, x, y);
					column.push(mesh);
					blocks.add(mesh);
				}
			}
			this.gameGrid.push(column);
		}
		return blocks;
	}

	updateTowerPos(){
		this.gameBoard.position.y = -this.halfBoardPixelHeight + this.upOffset;
		return this.gameBoard.position.y;
	}

	updateCursorPos(){
		this.cursorObj.position.y = this.calcYBlockPos(this.selectorY) - this.halfBoardPixelHeight + this.upOffset;

		if(this.cursorObj.position.y > this.halfBoardPixelHeight-(this.blockHeight/2)){
			this.cursorObj.position.y = this.halfBoardPixelHeight-(this.blockHeight/2)
		}

		if(this.mapType === MAP_2D) {
			this.cursorObj.position.x = this.calcXBlockPos(this.selectorX)-this.blockWidth/2;
		}else{
			this.cursorObj.position.x = 0;
		}
	}

	updateNextRowPos(){
		this.nextRow.position.y = this.calcYBlockPos(-1) - this.halfBoardPixelHeight - (this.blockHeight / 2) + this.upOffset;
	}

	gameAnimations(){
		//====================================================
		//====These animations are now LOCKED at 30 FPS!!!====
		//====================================================
		//TODO = CHANGE THESE TO USE THE TWEEN LIBRARY /W LOOPING ANIMATIONS - this would allow the client to choose the fps, while keeping the same visual timing, instead of just locking it at 30.

		//let timer = performance.now();

		//this.menuObj.rotation.y = Math.sin(this.PuzzleGame.piTimer) * (HALF_PI / 10);

		if (!this.gameActive || this.PuzzleGame.paused) {
			return;
		}

		let almostDead = {};
		for (let tx = 0; tx < this.boardWidth; tx++) {
			almostDead[tx] = this.gameGrid[tx][this.boardHeight - 3] !== null;
		}

		for (let x = 0; x < this.boardWidth; x++) {
			for (let y = 0; y < this.boardHeight; y++) {
				let block = this.gameGrid[x][y];
				if (block !== null && block.userData.exploding) {
					block.scale.x = block.scale.y = (0.1 * Math.sin(this.PuzzleGame.piTimer * 16) + 0.8);
				}

				if (block !== null) {
					if (almostDead[x]) {
						block.rotation.z = Math.cos(this.PuzzleGame.piTimer * 3) * PI / 32
					} else {
						block.rotation.z = 0;
					}
				}
			}
		}

		for (let i = 0; i < this.nextRow.children.length; i++) {
			if (almostDead[i]) {
				this.nextRow.children[i].rotation.z = Math.cos(this.PuzzleGame.piTimer * 3) * PI / 32
			} else {
				this.nextRow.children[i].rotation.z = 0;
			}
		}

		for (let c = 0; c < this.cursorObj.children.length; c++) {
			this.cursorObj.children[c].scale.x = this.cursorObj.children[c].scale.y = (0.05 * Math.sin(this.PuzzleGame.piTimer*4) + 1);
		}
	}
}