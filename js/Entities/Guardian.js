GuardianClass = function(guardianJson){
	EntityClass.call(this);

	this.origen = {x:guardianJson.xIni,y:guardianJson.yIni};
	this.destino = {x:guardianJson.xDest,y:guardianJson.yDest};
	this.pos = {x:guardianJson.xIni,y:guardianJson.yIni};
	this.last = {x:guardianJson.xIni,y:guardianJson.yIni};
	if(guardianJson.velocidad){
		this.speed = guardianJson.velocidad;
	}else{
		this.speed = 50;
	}
	this.energy = 10;
	this.damage = 3;
	this.currSpriteName = "Guardia";
	this.rangoVisionSpriteName = "Vision";

	this.dir = new b2Vec2(this.destino.x, this.destino.y);
	this.dir.Subtract(this.origen);
	this.dir.Normalize();

	this.w=2;
	this.h=2;

	// Create our physics body;
    var entityDef = {
        id: "Guardian",
        type: 'dynamic',
        x: this.origen.x,
        y: this.origen.y,
        halfHeight: 32 * 0.5,
        halfWidth: 32 * 0.5,
        damping: 0,
        angle: 0,
        filterGroupIndex:1,
        categories: ['projectile'],
        collidesWith: ['player'],
        userData: {
            "id": "Guardian",
            "ent": this
        }
    };

    this.physBody = gPhysicsEngine.addBody(entityDef);
    this.physBody.SetLinearVelocity(new b2Vec2(this.dir.x * this.speed, this.dir.y * this.speed));
}

GuardianClass.prototype = Object.create(EntityClass.prototype);
GuardianClass.prototype.constructor = GuardianClass;

GuardianClass.prototype.update = function(){
	if(this.physBody !== null) {
        this.pos = this.physBody.GetPosition();
        this.physBody.SetLinearVelocity(new b2Vec2(this.dir.x * this.speed, this.dir.y * this.speed));
    }

	//Se asume que si uno de los ejes (x o y) del destino es superado, se alcanzó el objetivo
    //Primero Se valida si se alcanzó o se pasó el punto destino, en el eje de las x
    if(!this.isDead) {
		if(this.pos.x>this.last.x){
			if(this.destino.x<=this.pos.x && this.destino.x>=this.last.x){
				this.pos = this.destino;
				var temp = {x:this.origen.x, y:this.origen.y};
				this.origen={x:this.destino.x, y:this.destino.y};
				this.destino={x:temp.x, y:temp.y};
			}
		}else{
			if( (this.destino.x>=this.pos.x && this.destino.x<=this.last.x) && !(this.origen.x===this.destino.x)){
				this.pos = this.destino;
				var temp = {x:this.origen.x, y:this.origen.y};
				this.origen={x:this.destino.x, y:this.destino.y};
				this.destino={x:temp.x, y:temp.y};
			}
		}
	}
	//Si no se detuvo por las validaciones en el eje de las x, validamos en y
	if(!this.isDead) {
		if(this.pos.y>this.last.y){
			if(this.destino.y<=this.pos.y && this.destino.y>=this.last.y){
				this.pos = this.destino;
				var temp = {x:this.origen.x, y:this.origen.y};
				this.origen={x:this.destino.x, y:this.destino.y};
				this.destino={x:temp.x, y:temp.y};
			}
		}else{
			if((this.destino.y>=this.pos.y && this.destino.y<=this.last.y) && !(this.origen.y===this.destino.y)){
				this.pos = this.destino;
				var temp = {x:this.origen.x, y:this.origen.y};
				this.origen={x:this.destino.x, y:this.destino.y};
				this.destino={x:temp.x, y:temp.y};
			}
		}
	}

	this.dir = new b2Vec2(this.destino.x, this.destino.y);
	this.dir.Subtract(this.origen);
	this.dir.Normalize();

	this.last.x=this.pos.x;
    this.last.y=this.pos.y;

	if(!this.isDead) {
		this.physBody.SetLinearVelocity(new b2Vec2(this.dir.x * this.speed, this.dir.y * this.speed));
		this.angulo = Math.atan2(this.dir.y, this.dir.x);
	}
	

}

GuardianClass.prototype.draw = function(){
	EntityClass.prototype.draw.call(this);
	pintarSpriteCenter(this.rangoVisionSpriteName, this.pos.x, this.pos.y, this.w, this.h, this.angulo, 'Y');
}

GuardianClass.prototype.onTouch = function(otherBody, point, impulse){
    if(!this.physBody) return false;
    if(!otherBody.GetUserData()) return false;

    var physOwner = otherBody.GetUserData().ent;
    

    if(physOwner !== null) {
        if(!this.physBody) 
        if(physOwner.energy !== null) {
            physOwner.energy +=10;
        }

        if(!this.physBody)  this.isDead = true;
    }

    return true;
}