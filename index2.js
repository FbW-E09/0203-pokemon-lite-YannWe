const prompt = require("prompt-sync")({ sigint: true });
const colors = require("colors");

/**
 * Pokemon constructor : create pokemons with
 *  –name
 *  –health
 *  –magic
 *  –bunch of skills (?)
 *
 * Pokemon methods:
 *  showStatus:
 *      – amount of health
 *      – amount of magic
 *  attack:
 *      1. pick attack skill
 *      2. attack another pokemon
 *      – watchout:
 *          – enough magic to do attack?
 *      3. take in arguments:
 *          i. index of attack
 *          ii. pokemon to attack
 *  getMagic
 *      – recharge magic
 *
 *
 * AttackSkill constructor: create new attacks
 * -attacks (make them up):
 *  – consume pokemon's magic to do damage
 *  – each pokemon has specific set of attacks
 *
 *  AttackSkill method:
 *      -3 arguments:
 *          –name of attack
 *          –amount of damage
 *          –magic required for attack
 *
 *  learnAttackSkill method:
 *      - pokemon has no skills when created
 *      - (create skills array for each pokemon) attacks should be added to pokemon's skills array
 */

class Arena {
  constructor() {
    this.pokemons = [];
    this.bluePokemon = [];
    this.greenPokemon = [];
    this.roundCounter = 0;
    this.attackBlue = "";
    this.attackGreen = "";
  }
  addPokemon(...pokemonName) {
    this.pokemons.push(...pokemonName);
    return this.pokemons;
  }
  displayPokemons() {
    return this.pokemons.map(
      (pokemonName) =>
        `${pokemonName.pokemonName}: HP:${pokemonName.hitPoints} | DEF:${
          pokemonName.defense
        } | MANA:${pokemonName.mana}  ||| SKILLSET:${pokemonName.skills.map(
          (skill) =>
            ` ${skill.skillName} » DMG:${skill.damage} | COST:${skill.manaCost}`
        )}`
    );
  }
  pickPokemonBlue(name) {
    let check = this.pokemons.find(
      (pickedName) =>
        pickedName.pokemonName.toLowerCase() === name.toLowerCase()
    );
    if (check === undefined) {
      return "Whatever that pokemon is, it isn't here and probably doesn't want to fight in the Arena...because really this is animal cruelty";
    } else {
      this.bluePokemon = check;
      console.log(this.bluePokemon);
      return `${check.pokemonName} has entered the Arena`;
    }
  }
  pickPokemonGreen(name) {
    let check = this.pokemons.find(
      (pickedName) =>
        pickedName.pokemonName.toLowerCase() === name.toLowerCase()
    );
    if (check === undefined) {
      return "Whatever that pokemon is, its not ready to fight in the Arena";
    } else {
      this.greenPokemon = check;
      console.log(this.greenPokemon);
      return `${check.pokemonName} has entered the Arena`;
    }
  }
  showStatusBlue() {
    return `${this.bluePokemon.pokemonName} has ${this.bluePokemon.hitPoints} hit points, ${this.bluePokemon.mana} mana points left and currently has a damage multiplier of ${this.bluePokemon.level}x`;
  }
  showStatusGreen() {
    return `${this.greenPokemon.pokemonName} has ${this.greenPokemon.hitPoints} hit points, ${this.greenPokemon.mana} mana points left and currently has a damage multiplier of ${this.greenPokemon.level}x`;
  }
  blueAttackTurn(skill) {
    let check = this.bluePokemon.skills.find(
      (pickedSkill) =>
        pickedSkill.skillName.toLowerCase() === skill.toLowerCase()
    );
    /* if (skill.toLowerCase() === "skip") {
      this.bluePokemon.mana = +30;
      return "increasing mana by 30 & skipping attack";
    } else if (this.bluePokemon.mana < check.manaCost) { */
    /* else if (check === undefined) {
      console.log(
        `${this.bluePokemon.pokemonName} doesn't know that attack, try again`
      );
      return attackBlue;
    } */
    /*       return `${this.bluePokemon.pokemonName} doesn't have enough mana to execute that attack, skip or pick another attack`; */

    this.bluePokemon.mana -= check.manaCost;
    let damageVsDefense = check.damage - this.greenPokemon.defense;
    if (damageVsDefense > 0) {
      this.greenPokemon.hitPoints -= damageVsDefense;
      return `${this.bluePokemon.pokemonName} did ${damageVsDefense} damage to ${this.greenPokemon.pokemonName}`;
    } else {
      return `${this.greenPokemon.pokemonName} deflected ${this.bluePokemon.pokemonName}'s attack`;
    }
  }

  greenAttackTurn(skill) {
    let check = this.greenPokemon.skills.find(
      (pickedSkill) =>
        pickedSkill.skillName.toLowerCase() === skill.toLowerCase()
    );
    /* if (skill.toLowerCase() === "skip") {
      this.greenPokemon.mana += 30;
      return "increasing mana by 30 & skipping attack";
    } */
    /* else if (check === undefined) {
      return (
        `${this.greenPokemon.pokemonName} doesn't know that attack, try again` &&
        attackBlue
      ); 
    } */
    this.greenPokemon.mana -= check.manaCost;
    let damageVsDefense = check.damage - this.bluePokemon.defense;
    if (damageVsDefense > 0) {
      this.bluePokemon.hitPoints -= damageVsDefense;
      return `${this.greenPokemon.pokemonName} did ${damageVsDefense} damage to ${this.bluePokemon.pokemonName}`;
    } else {
      return `${this.bluePokemon.pokemonName} deflected ${this.greenPokemon.pokemonName}'s attack`;
    }
  }
  checkHealthBlue() {
    let check = this.pokemons.find(
      (name) => name.pokemonName === this.bluePokemon.pokemonName
    );
    if (this.bluePokemon.pokemonName) {
    }
  }
  attackCheckBlue() {
    if (arena.attackBlue.toLowerCase() === "skip") {
      arena.bluePokemon.mana += 30;
      console.log(`skipping attack & increasing mana by 30`.blue);
    } else if (
      !(
        arena.bluePokemon.skills[0].skillName.toLowerCase() ===
          arena.attackBlue.toLowerCase() ||
        arena.bluePokemon.skills[1].skillName.toLowerCase() ===
          arena.attackBlue.toLowerCase()
      )
    ) {
      arena.attackBlue = prompt(
        `${this.bluePokemon.PokemonName} doesn't know this attack. \n Blue Player: Pick your attack: `
          .blue
      );
      attackCheckBlue();
    } else {
      console.log(colors.blue(arena.blueAttackTurn(arena.attackBlue)));
    }
  }
  fight() {
    this.roundCounter += 1;
    console.log(colors.yellow(`Round ${this.roundCounter}`));
    console.log(
      "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
        .red
    );
    this.attackBlue = prompt("Blue Player: Pick your attack: ".blue);
    this.attackCheckBlue();
    console.log(
      "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
        .red
    );
    if (this.greenPokemon.hitPoints <= 0 || this.bluePokemon.hitPoints <= 0) {
      this.master();
    } else {
      this.attackGreen = prompt("Green Player: Pick your attack: ".green);
      function attackCheckGreen() {
        if (this.attackGreen.toLowerCase() === "skip") {
          this.greenPokemon.mana += 30;
          console.log(`skipping attack & increasing mana by 30`.green);
        } else if (
          !(
            this.greenPokemon.skills[0].skillName.toLowerCase() ===
              this.attackGreen.toLowerCase() ||
            this.greenPokemon.skills[1].skillName.toLowerCase() ===
              this.attackGreen.toLowerCase()
          )
        ) {
          this.attackGreen = prompt("Green Player: Pick your attack: ".green);
          attackCheckGreen();
        } else {
          console.log(colors.green(this.greenAttackTurn(this.attackGreen)));
        }
      }
      attackCheckGreen();
      console.log(
        "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
          .red
      );
    }
    console.log(
      "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
        .red
    );
    console.log(colors.blue(this.showStatusBlue()));
    console.log(colors.green(this.showStatusGreen()));
    console.log(
      "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
        .red
    );
    this.master();
  }
  master() {
    if (this.bluePokemon.hitPoints <= 0) {
      console.log(
        colors.bold.bgGreen.black(
          `${this.greenPokemon.pokemonName} has defeated ${this.bluePokemon.pokemonName} - Green Player Wins!`
        )
      );
    } else if (this.greenPokemon.hitPoints <= 0) {
      console.log(
        colors.bold.bgBlue.black(
          `${this.bluePokemon.pokemonName} has defeated ${this.greenPokemon.pokemonName} - Blue Player Wins!`
        )
      );
    } else {
      return this.fight();
    }
  }
  startGame() {
    console.log(
      colors.yellow(
        "Players, decide which pokemon you want:",
        arena.displayPokemons()
      )
    );
    console.log(
      "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
        .red
    );
    let pickPokemonBlue = prompt("Blue Player: Pick your Pokemon: ".blue);
    console.log(arena.pickPokemonBlue(pickPokemonBlue).blue);
    console.log(
      "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
        .red
    );
    let pickPokemonGreen = prompt("Green Player: Pick your Pokemon: ".green);
    console.log(colors.green(arena.pickPokemonGreen(pickPokemonGreen)));
    console.log(
      "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
        .red
    );
    console.log(colors.blue(arena.showStatusBlue()));
    console.log(colors.green(arena.showStatusGreen()));
    console.log(
      "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
        .red
    );
    arena.fight();
  }
}

class Pokemon {
  constructor(pokemonName, hitPoints, defense, mana, level) {
    this.pokemonName = pokemonName;
    this.hitPoints = hitPoints;
    this.defense = defense;
    this.mana = mana;
    this.level = level;
    this.skills = [];
  }
  reduceStats() {
    this.hitPoints -= 10;
  }
  addSkill(skill) {
    this.skills.push(skill);
  }
}

class Skill {
  constructor(skillName, damage, manaCost) {
    this.skillName = skillName;
    this.damage = damage;
    this.manaCost = manaCost;
  }
}

// pokemons

let pikachu = new Pokemon("Pikachu", 35, 40, 80, 1);
let bulbasaur = new Pokemon("Bulbasaur", 45, 49, 105, 1);
let charmandar = new Pokemon("Charmandar", 39, 43, 75, 1);
let squirtle = new Pokemon("Squirtle", 44, 20, 65, 1);
let jigglyPuff = new Pokemon("Jigglypuff", 115, 20, 65, 1);
let bellSprout = new Pokemon("Bellsprout", 50, 35, 200, 1);
let mewTwo = new Pokemon("Mewtwo", 106, 5, 50, 1);

// skills
//pikachu
let static = new Skill("Static", 50, 30);
let lightningRod = new Skill("Lightning Rod", 90, 67);
pikachu.addSkill(static);
pikachu.addSkill(lightningRod);

//bulbasaur
let overGrow = new Skill("Overgrow", 50, 20);
let chlorophyll = new Skill("Chlorophyll", 70, 50);
bulbasaur.addSkill(overGrow);
bulbasaur.addSkill(chlorophyll);

// charmandar
let blaze = new Skill("Blaze", 30, 10);
let solarPower = new Skill("Solar Power", 60, 40);
charmandar.addSkill(blaze);
charmandar.addSkill(solarPower);

//squirtle
let torrent = new Skill("Torrent", 45, 23);
let rainDash = new Skill("Rain Dash", 78, 46);
squirtle.addSkill(torrent);
squirtle.addSkill(rainDash);
//jigglypuff
let cuteCharm = new Skill("Cute Charm", 60, 80);
let competitive = new Skill("Competitive", 30, 10);
jigglyPuff.addSkill(cuteCharm);
jigglyPuff.addSkill(competitive);

//bellsprout (also has chlorophyll)
let gluttony = new Skill("Gluttony", 90, 90);
bellSprout.addSkill(gluttony);
bellSprout.addSkill(chlorophyll);

//mewtwo
let pressure = new Skill("Pressure", 10, 15);
let unnerve = new Skill("Unnerve", 70, 90);
mewTwo.addSkill(pressure);
mewTwo.addSkill(unnerve);

//create Arena
let arena = new Arena();
arena.addPokemon(
  pikachu,
  bulbasaur,
  charmandar,
  squirtle,
  jigglyPuff,
  bellSprout,
  mewTwo
);

arena.startGame();
