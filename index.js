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
    /*     this.roundCounter = 0;
    this.attackBlue = "";
    this.attackGreen = ""; */
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
      return
    } else {
      this.bluePokemon = check;
      console.log(this.bluePokemon);
      return `${check.pokemonName} has entered the Arena`;
    }}
  pickPokemonGreen(name) {
    let check = this.pokemons.find(
      (pickedName) =>
        pickedName.pokemonName.toLowerCase() === name.toLowerCase()
    );
    if (check === undefined) {
      return
    } else {
      this.greenPokemon = check;
      console.log(this.greenPokemon);
      return `${check.pokemonName} has entered the Arena`;
    }
  }
  showStatusBlue() {
    return `${this.bluePokemon.pokemonName} has ${this.bluePokemon.hitPoints} hit points, ${this.bluePokemon.mana} mana points left`} 
    // and currently has a damage multiplier of ${this.bluePokemon.level}x`;
  showStatusGreen() {
    return `${this.greenPokemon.pokemonName} has ${this.greenPokemon.hitPoints} hit points, ${this.greenPokemon.mana} mana points left`} 
/*     and currently has a damage multiplier of ${this.greenPokemon.level}x`;
  } */
  blueAttackTurn(skill) {
    let check = this.bluePokemon.skills.find(
      (pickedSkill) =>
        pickedSkill.skillName.toLowerCase() === skill.toLowerCase()
    );
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
    this.greenPokemon.mana -= check.manaCost;
    let damageVsDefense = check.damage - this.bluePokemon.defense;
    if (damageVsDefense > 0) {
      this.bluePokemon.hitPoints -= damageVsDefense;
      return `${this.greenPokemon.pokemonName} did ${damageVsDefense} damage to ${this.bluePokemon.pokemonName}`;
    } else {
      return `${this.bluePokemon.pokemonName} deflected ${this.greenPokemon.pokemonName}'s attack`;
    }
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

// fight function & global variables

let roundCounter = 0;
let attackBlue = "";
let attackGreen = "";

function fight() {
  roundCounter += 1;
  console.log(colors.yellow(`Round ${roundCounter}`));
  console.log(
    "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
      .red
  );

  // Blue turn
  attackBlue = prompt("Blue Player: Pick your attack: ".blue);
  function attackCheckBlue() {
    let check = arena.bluePokemon.skills.find(
      (pickedSkill) =>
        pickedSkill.skillName.toLowerCase() === attackBlue.toLowerCase()
    );
    if (attackBlue.toLowerCase() === "skip") {
      arena.bluePokemon.mana += 30;
      console.log(`skipping attack & increasing mana by 30`.blue);
    } else if (
      !(
        arena.bluePokemon.skills[0].skillName.toLowerCase() ===
          attackBlue.toLowerCase() ||
        arena.bluePokemon.skills[1].skillName.toLowerCase() ===
          attackBlue.toLowerCase()
      )
    ) {
      attackBlue = prompt(
        "Blue Player: Your Pokemon doesn't know that skill, pick your attack: "
          .blue
      );
      attackCheckBlue();
    } else if (arena.bluePokemon.mana < check.manaCost) {
      attackBlue = prompt(
        "Blue Player: Not enough Mana, pick another attack skill or skip to recover mana: "
          .blue
      );
      attackCheckBlue();
    } else {
      console.log(colors.blue(arena.blueAttackTurn(attackBlue)));
    }
  }
  attackCheckBlue();
  console.log(
    "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
      .red
  );
  if (arena.greenPokemon.hitPoints <= 0 || arena.bluePokemon.hitPoints <= 0) {
    master();
  } else {

    //Green Turn
    attackGreen = prompt("Green Player: Pick your attack: ".green);
    function attackCheckGreen() {
      let check = arena.greenPokemon.skills.find(
        (pickedSkill) =>
          pickedSkill.skillName.toLowerCase() === attackGreen.toLowerCase()
      );
      if (attackGreen.toLowerCase() === "skip") {
        arena.greenPokemon.mana += 30;
        console.log(`skipping attack & increasing mana by 30`.green);
      } else if (
        !(
          arena.greenPokemon.skills[0].skillName.toLowerCase() ===
            attackGreen.toLowerCase() ||
          arena.greenPokemon.skills[1].skillName.toLowerCase() ===
            attackGreen.toLowerCase()
        )
      ) {
        attackGreen = prompt("Green Player: Pick your attack: ".green);
        attackCheckGreen();
      } else if (arena.greenPokemon.mana < check.manaCost) {
        attackGreen = prompt(
          "Green Player: Not enough Mana, pick your attack: ".green
        );
        attackCheckGreen();
      } else {
        console.log(colors.green(arena.greenAttackTurn(attackGreen)));
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
  console.log(colors.blue(arena.showStatusBlue()));
  console.log(colors.green(arena.showStatusGreen()));
  console.log(
    "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
      .red
  );

  master();
}

//Check health until one pokemon dies - else return to fight()
function master() {
  if (arena.bluePokemon.hitPoints <= 0) {
    console.log(
      colors.bold.bgGreen.black(
        `${arena.greenPokemon.pokemonName} has defeated ${arena.bluePokemon.pokemonName} - Green Player Wins!`
      )
    );
  } else if (arena.greenPokemon.hitPoints <= 0) {
    console.log(
      colors.bold.bgBlue.black(
        `${arena.bluePokemon.pokemonName} has defeated ${arena.greenPokemon.pokemonName} - Blue Player Wins!`
      )
    );
  } else {
    return fight();
  }
}
/**
 * 1. players pick pokemons
 *    i. picked pokemons to be added to independent arrays
 * 2. blue player always goes first to attack
 * 3. attack sequence:
 *    i. both Pokemon statuses are displayed and attacking player decides what to do:
 *        a. picks attack & execute
 *        b. skip attack to increase mana by 30 & skip to 4.
 *    ii. impact on target:
 *        a. attack – defense: if leftover attack <= 0, no hit
 *        b. leftover attack > 0, HP of target – leftover attack
 *        c. if leftover HP is less than 40%, increase pokemon to level 2 (double damage in next turn)
 *    iii. impact on attacker
 *        a. reduce mana by cost of attack
 *        b. increase mana by 10
 *  4. next players turn
 *  5. repeat sequence from 3. until either player's pokemon HP is <= 0, game over.
 */

//game sequence


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
  function pokemonCheckBlue() {
    let check = arena.pokemons.find(
      (pickedPokemon) =>
        pickedPokemon.pokemonName.toLowerCase() === pickPokemonBlue.toLowerCase()
    );
    if (check === undefined) {
      pickPokemonBlue = prompt("Blue Player: Pokemon doesn't exist. Pick your Pokemon: ".blue);
      pokemonCheckBlue()
    } else {console.log(arena.pickPokemonBlue(pickPokemonBlue).blue);}
  }
  pokemonCheckBlue()
  console.log(
    "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
      .red
  );
  let pickPokemonGreen = prompt("Green Player: Pick your Pokemon: ".green);
  function pokemonCheckGreen() {
    let check = arena.pokemons.find(
      (pickedPokemon) =>
        pickedPokemon.pokemonName.toLowerCase() === pickPokemonGreen.toLowerCase()
    );
    if (check === undefined) {
      pickPokemonGreen = prompt("Green Player: Pokemon doesn't exist. Pick your Pokemon: ".green);
      pokemonCheckGreen()
    } else {console.log(arena.pickPokemonGreen(pickPokemonGreen).green);}
  }
  pokemonCheckGreen()
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
  console.log(
    "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
      .red
  );
  fight();


/* while (arena.bluePokemon.hitPoints > 0 || arena.greenPokemon.hitPoints > 0) {
  return;
} */

/* let attackBlue = prompt("Blue Player: Pick your attack: ".blue);
console.log(colors.blue(arena.blueAttackTurn(attackBlue)));
console.log(
  "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
    .red
);
let attackGreen = prompt("Green Player: Pick your attack: ".green);
console.log(colors.green(arena.greenAttackTurn(attackGreen)));
console.log(colors.blue(arena.showStatusBlue()));
console.log(colors.green(arena.showStatusGreen()));
console.log(
  "–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
    .red
); */
