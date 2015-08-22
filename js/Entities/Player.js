PlayerClass = function(playerJson){		//Heredamos de la clase entidad
	EntityClass.call(this);
	
	this.pos.x=playerJson.xIni;
	this.pos.y=playerJson.yIni;
	this.currSpriteName = 'Monstruo';
	this.movimiento = 2;				//Cantidad de movimiento por cada tick
	//Indica el tiempo que debe esperar, para disparar nuevamente
	this.weponColdown = 30;
	//Indica si el arma está lista para disparar, 0: listo, >0 enfriando
	this.weponReadyCountdown = 0;
	//TRUE indica que cada click es un disparo, FALSE que mientras este presionado el mouse, dispara si se ha cumplido el cold down del arma
	this.discreteShoot = true;
	//Vida del jugador
	this.energy = 1;
	this.w=2;
	this.h=2;

	// Create our physics body;
    var entityDef = {
        id: "Player",
        type: 'dynamic',
        x: this.pos.x,
        y: this.pos.y,
        halfHeight: 32 * 0.5,
        halfWidth: 32 * 0.5,
        damping: 0,
        angle: 0,
        filterGroupIndex:1,
        categories: ['projectile'],
        collidesWith: ['player'],
        userData: {
            "id": "Player",
            "ent": this
        }
    };

    this.physBody = gPhysicsEngine.addBody(entityDef);
}

PlayerClass.prototype = Object.create(EntityClass.prototype);
PlayerClass.prototype.constructor = PlayerClass;

PlayerClass.prototype.update = function(){

	if(this.energy<1){
		isDead=true;
		return;
	}

	if(this.weponReadyCountdown>0){
		this.weponReadyCountdown--;
	}

	//Validamos si hay acciones pendientes por ejecutar
	if(gInputEngine.actions[MOV_IZQUIERDA]){
		this.pos.x = this.pos.x - this.movimiento;
	}
	if(gInputEngine.actions[MOV_DERECHA]){
		this.pos.x = this.pos.x + this.movimiento;
	}
	if(gInputEngine.actions[MOV_ARRIBA]){
		this.pos.y = this.pos.y - this.movimiento;
	}
	if(gInputEngine.actions[MOV_ABAJO]){
		this.pos.y = this.pos.y + this.movimiento;
	}

	//Validamos si esta activa la accion de disparar
	if(gInputEngine.actions[ACT_DISPARA] && this.weponReadyCountdown==0){
		/*
		if(this.discreteShoot){
			this.weponReadyCountdown=this.weponColdown;
		}
		var disparo = new BulletClass(this.pos, GE.marcaMouse.pos);
		disparo.calcularSteps();
		GE.entities.push(disparo);
		*/
	}

}