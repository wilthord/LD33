GUIEntityClass = function(GUIJson){
	EntityClass.call(this);

	this.currSpriteName = GUIJson.spriteName;

	this.pos = {x:GUIJson.xIni, y:GUIJson.yIni};

	this.sizeX = GUIJson.sizeX;

	this.sizeY = GUIJson.sizeY;

	this.GUIAction = GUIJson.GUIAction;
}

GUIEntityClass.prototype = Object.create(EntityClass.prototype);

GUIEntityClass.prototype.constructor = GUIEntityClass;

GUIEntityClass.prototype.update = function(){
	if(gInputEngine.actions[CLICK]){
		if(GE.marcaMouse.pos.x>=this.pos.x && GE.marcaMouse.pos.y>=this.pos.y && GE.marcaMouse.pos.x<=(this.pos.x+this.sizeX) && GE.marcaMouse.pos.y<=(this.pos.y+this.sizeY)){
			//TODO llamar a la accion
		}
	}
}