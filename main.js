/**
 * Juego de Ping Pong de Código Facilito MVC
 *
 * @author [Juan David Rivera Naranjo - juandavidnaranjo75@gmail.com]
 * @version [v1.0.0]
 * @since [v1.0.0]
 */

/**
 * Función anonima para declarar una clase Board (tablero) que seria el modelo
 */
(function () {
  /**
   * self - se usa para siempre tener la referencia original del objeto
   * de este modo es como si estubiera declarando una clase
   * @param {*} width - recibe como parametro el ancho
   * @param {*} height - recibe como parametro el largo
   */
  self.Board = function (width, height) {
    this.width = width; //Ancho
    this.height = height; // Alto
    this.playing = false; //Jugando
    this.game_over = false; //Fin del juego
    this.bars = []; // Barra de las orillas del juego
    this.ball = null; // Pelota
    this.playing = false; //Jugando
  };

  /**
   * Modificación del prototipo de la clase para colocar los metodos de la misma
   */
  self.Board.prototype = {
    get elements() {
      //Modificar los metodos de las clases
      var elements = this.bars.slice(); // Barra laterales del juego
      elements.push(this.ball); // Agregar una pelota
      return elements; // Retorna todos los elementos que hay en el tablero.
    },
  };
})();

/**
 * clase Ball para crear la pelota
 */
(function () {
  /**
   * @param {*} x - recibe la cordenada en x
   * @param {*} y - recibe la cordenada en y
   * @param {*} radius - recibe el radio de la pelota
   * @param {*} board - recide el board
   */
  self.Ball = function (x, y, radius, board) {
    this.x = x; //Coordenada x
    this.y = y; //Coordenada y
    this.radius = radius; //Radio de la pelota
    this.board = board; //board
    this.speed_y = 0; //Velocidad en la cordenada y
    this.speed_x = 3; //Velocidad en la cordenada y
    this.board.ball = this; // le decimos a board que la pelota es this, asignamos al objeto ball
    this.kind = "circle"; // lo que se va a dibujar
    this.direction = 1; //Direccion de la pelota
    this.bounce_angle = 0;
    this.max_bounce_angle = Math.PI / 12;
    this.speed = 3;
  };

  self.Ball.prototype = {
    /**
     * Metodo para cambiar de dirección la pelota
     */
    move: function () {
      this.x += this.speed_x * this.direction;
      this.y += this.speed_y;
    },
    get width() {
      return this.radius * 2; //Devuelve el diametro
    },
    get height() {
      return this.radius * 2; //Devuelve el diametro
    },
    /**
     * Reaccion a la colisión con una barra y cambiar el angulo de rebote
     * de la pelota
     * @param {*} bar - recibe la barra
     */
    collision: function (bar) {
      var relative_intersect_y = bar.y + bar.height / 2 - this.y;
      var normalized_intersect_y = relative_intersect_y / (bar.height / 2);
      this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;
      this.speed_y = this.speed * Math.sin(this.bounce_angle);
      this.speed_x = this.speed * Math.cos(this.bounce_angle);
      if (this.x > this.board.width / 2) this.direction = -1;
      else this.direction = 1;
    },
  };
})();

/**
 * Función anonima auto ejecutable para declarar una clase Bar la vista
 */
(function () {
  /**
   *Clase bar para saber la posicion y ancho y el largo
   * @param {*} x - recibe la cordenada x
   * @param {*} y - recibe la cordenada y
   * @param {*} width - recibe el tamaño
   * @param {*} height - recibe el alto
   * @param {*} bars - recibe el bars tablero
   */
  self.Bar = function (x, y, width, height, board) {
    //Constructor de la clase
    this.x = x; //Cordenada x
    this.y = y; //Cordenada y
    this.width = width; //Ancho
    this.height = height; //Alto
    this.board = board; //Tablero
    this.board.bars.push(this); // Agregando al tablero las barras laterales
    this.kind = "rectangle"; // Atributo para saber lo que se va a dibujar para que canvas sepa que dibuja
    this.speed = 10; // Velocidad para mover las barras
  };

  /**
   * Modificación del prototipo de la clase para colocar los metodos de la misma
   * Metodos para mover las barras
   */
  self.Bar.prototype = {
    down: function () {
      //Movernos para abajo
      this.y += this.speed;
    },
    up: function () {
      // Movernos hacia abajo
      this.y -= this.speed;
    },
    toString: function () {
      return `x: ${this.x} y: ${this.y}`;
    },
  };
})();
/**
 * Función anonima para declarar una clase BoardView la vista
 */
(function () {
  /**
   * Creando la clase
   * @param {*} canvas - Recibe como parametro el canvas
   * @param {*} board - Recibe como parametro el objeto Board
   */
  self.BoardView = function (canvas, board) {
    this.canvas = canvas; // Elemento canvas
    this.canvas.width = board.width; // Ancho del elemento canvas
    this.canvas.height = board.height; // alto del elemento canvas
    this.board = board; // board
    this.ctx = canvas.getContext("2d"); // Contexto para poder dibujar
  };

  self.BoardView.prototype = {
    /**
     * Metodo para limpiar, dibuja un triangulo transparente
     */
    clean: function () {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    },
    /**
     * Metodo para dibujar la barra, recorre el board.elements
     */
    draw: function () {
      for (var index = this.board.elements.length - 1; index >= 0; index--) {
        var el = this.board.elements[index];
        draw(this.ctx, el); //Se le pasa el contexto y el elemento que va a dibujar
      }
    },

    /**
     * Recorremos las barras para darnos cuenta si alguna esta colisionando
     */
    check_collisions: function () {
      for (var index = this.board.bars.length - 1; index >= 0; index--) {
        var bar = this.board.bars[index];
        //Saber si colisionan
        if (hit(bar, this.board.ball)) {
          this.board.ball.collision(bar);
        }
      }
    },

    /**
     * Metodo para iniciar el juego
     */
    play: function () {
      if (this.board.playing) {
        this.clean();
        this.draw();
        this.check_collisions();
        this.board.ball.move();
      }
    },
  };

  /**
   * Metodo para revisar si a colisiona con b
   * @param {*} a
   * @param {*} b
   */
  function hit(a, b) {
    //Revisa si a colisiona con b
    var hit = false;
    //Colisiones horizontales
    if (b.x + b.width >= a.x && b.x < a.x + a.width) {
      //Colisiones verticales
      if (b.y + b.height >= a.y && b.y < a.y + a.height) hit = true;
    }
    //Colision de a con b
    if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
      if (b.y <= a.y && b.y + b.height >= a.y + a.height) hit = true;
    }
    //Colision b con a
    if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
      if (a.y <= b.y && a.y + a.height >= b.y + b.height) hit = true;
    }
    return hit;
  }

  /**
   * Funcion draw para dibujar
   * @param {*} ctx
   * @param {*} element
   */
  function draw(ctx, element) {
    //if (element != null && element.hasOwnProperty("kind")) {
    switch (
      element.kind //dependiendo de lo que traiga el elemento se dibuja
    ) {
      case "rectangle":
        ctx.fillRect(element.x, element.y, element.width, element.height);
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radius, 0, 7);
        ctx.fill();
        ctx.closePath();
      default:
        break;
    }
    //}
  }
})();

var board = new Board(800, 400); //Creando un objeto de la clase board
var bar = new Bar(20, 100, 40, 100, board); // Creando un objeto de la clase bar
var bar_2 = new Bar(735, 100, 40, 100, board); // Creando un objeto de la clase bar
var canvas = document.querySelector("#canvas"); //Seleccionar el elemento canvas
var board_view = new BoardView(canvas, board); //Creando un objeto de la clase boardView
var ball = new Ball(350, 100, 10, board);

/**
 * Escuchar cuando pulsan una tecla para saber el evento a lanzar
 */
document.addEventListener("keydown", function (ev) {
  if (ev.key == "ArrowUp") {
    ev.preventDefault();
    bar.up();
  } else if (ev.key === "ArrowDown") {
    ev.preventDefault();
    bar.down();
  } else if (ev.key === "w") {
    ev.preventDefault();
    bar_2.up();
  } else if (ev.key === "s") {
    ev.preventDefault();
    bar_2.down();
  } else if (ev.key === " ") {
    ev.preventDefault();
    board.playing = !board.playing;
  }
  console.log(bar.toString());
});

board_view.draw();
window.requestAnimationFrame(controller); // los frames del juego

/**
 * Function main para ejecutar todos los elementos
 */
function controller() {
  board_view.play();
  window.requestAnimationFrame(controller); // los frames del juego
}
