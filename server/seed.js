const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: `postgres`,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req,res) =>{sequelize.query(
        `drop table if exists comments;
        drop table if exists recipes;

        CREATE TABLE recipes (
            recipe_id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            title VARCHAR(500),
            instructions TEXT,
            ingredients TEXT,   
            source VARCHAR(100),
            link VARCHAR(1000)
        );

        INSERT INTO recipes (name, title, instructions, ingredients, source, link)
        VALUES ('pho', 
        'Beef Pho (VIETNAMESE NOODLE SOUP)', 
        'MAKE BROTH
        Add beef bones to a large pot that will hold at least 10 quarts. Then, cover bones with cold water. Place pot onto high heat and bring to a boil. Boil for 3 to 5 minutes. During this time, impurities and foam (or scum) will be released and rise to the top. Drain bones, discarding the water. Then, rinse bones with warm water and scrub stockpot to remove any residue that has stuck to the sides. Add the bones back to the stockpot and cover with 6 quarts of cold water.
        
        Meanwhile, move an oven rack to a high position then turn broiler to high. Line a baking sheet with aluminum foil. Place quartered onions and halved ginger onto baking sheet then broil for 10 to 15 minutes, turning onions and ginger occasionally so that they become charred or browned on all sides.
        
        Add cinnamon sticks, coriander seeds, fennel seeds, star anise, cloves and the black cardamom pod to a dry frying pan. Place onto low heat and cook, stirring occasionally until fragrant. About 5 minutes. Place toasted spices into a cotton muslin bag/herb sachet or cheesecloth then tie with butchers twine to seal.
        
        Bring stockpot with parboiled bones and water to a boil then lower to a gentle simmer. Add charred onion and ginger as well as the bag or sachet of toasted spices. Add 1 1/2 tablespoons of salt, a 1/4 cup of fish sauce and the rock sugar. Continue to simmer broth, uncovered, for 3 hours. If at any time foam or scum rises to the surface, use a spoon to remove it.
        
        Use tongs or a wide mesh spoon to remove bones, onion and ginger from broth then strain broth through a fine mesh strainer. The broth will have a layer of fat at the the top. There are two ways to remove this. First, if you plan to enjoy the broth now, skim the fat from the top of the broth using a spoon. If you do not mind waiting, you can also pour broth into containers then refrigerate overnight. As the broth cools, the fat will solidify, making it very easy to remove.
        
        ASSEMBLY
        Bring the broth to a gentle simmer over medium heat.
        
        If you are using dried noodles, add noodles to a bowl then cover with hot water and soak for 15 to 20 minutes until soft and opaque. If you are using fresh, add to a colander then rinse with cold water.
        
        To cook the noodles, bring a medium saucepan filled with water to a boil. Place noodles into boiling water and cook for about 10 seconds or until they collapse. Drain noodles then divide between bowls. (We like to fill each bowl by 1/3 with noodles).
        
        Arrange slices of raw meat into bowls, and then top with the hot broth. Finish broth with onion slices and cilantro. Serve bowls with a plate of optional garnishes listed above.',
        'BROTH
        5 to 6 pounds of beef knuckles or leg bones

        6 quarts cold water

        2 medium onions, quartered

        4-inch piece of fresh ginger, halved lengthwise

        2 cinnamon sticks

        1 tablespoon coriander seeds

        1 tablespoon fennel seeds

        6 star anise

        6 whole cloves

        1 black cardamom pod (see note below)

        1 1/2 tablespoons salt

        1/4 cup fish sauce

        1-inch piece yellow rock sugar (see note below)

        ASSEMBLY
        1 pound small (1/8-inch wide) dried or fresh “banh pho” noodles (see note)

        1/2 pound raw eye of round, sirloin or tri-tip steak, thinly sliced across the grain (see note)

        1/4 cup thinly sliced onions (see note)

        1/4 cup chopped cilantro leaves

        FOR THE TABLE
        Sprigs of fresh mint and/or Asian/Thai basil

        Bean sprouts

        Thinly sliced red chilies (such as Thai bird)

        Lime wedges

        Fish sauce

        Hoisin sauce',
        'Source: Inspire Taste',
        './link1.html'), 

        ('springrolls', 
        'Spring Rolls',
        'Boil shrimp according to our 3-minute boiled shrimp recipe then immediately cool in ice water and cut shrimp in half lengthwise. 
        Cook noodles according to package instructions until softened (do not overcook) rinse in a colander with cold water and drain well. Our method: fill a saucepan with water and bring to a boil, add the noodles, turn off the heat and let them sit in hot water for 5-7 minutes.
        Prep veggies – julienne cucumbers and carrots, remove stiff stems on lettuce leaves, coarsely chop cilantro,
        Assemble spring rolls one at a time. Fill a shallow round bowl with very warm/hot water. Submerge spring roll wrapper for about 10-15 seconds or until softened. Place wrapper on a lightly wet cutting board. 
        Add veggies – on the bottom half layer a piece of lettuce, a generous pinch of noodles, some carrots, cucumber, and cilantro sprigs. 
        Add shrimp – On the second half place halved shrimp with cut-side up.
        Tightly roll up the lettuce side first, tuck in the sides then roll over the shrimp and finish rolling.',
        '1/3 cup water
        1/4 cup fish sauce
        1/4 cup sugar, or to taste
        2 Tbsp lime juice
        2 tsp rice wine vinegar
        1-2 tsp chili garlic sauce (adding more will make it spicier)
        1 garlic clove, grated or minced
        2 tsp sesame oil
        1 Tbsp shredded carrot',
        'Source: NATASHASKITCHEN',
        './link2.html'),
        
        ('banhxeo', 
        'Vietnamese Pancake',
        'PREPARE BATTER
        Combine all batter ingredients except scallions in a large bowl for at least 3 hours, or overnight. Add scallions only right before making the crêpes.

        PREPARE FILLINGS
        Steam or soak mung beans in water until soft.
        Boil pork until cooked through and soft, then slice thinly.
        Wash bean sprouts and veggies.
        MAKING BÁNH XÈO – EACH CRÊPE TAKES ABOUT 8-10 MINUTES
        On medium-high heat add 1-2 teaspoons of oil and some onions
        Immediately add a few pieces of pork and shrimp. Sauté, lightly mixing until very lightly browned and fragrant.

        Pour in some batter and quickly tilt & rotate the pan so the batter is evenly spread. Add more batter if it wasnt enough to cover the pan. There should only be a thin layer of batter that almost flakes off at the pan edges where its thinner. If your batter doesnt do that and is too thick, add a few tbsp water to the batter and mix to thin it out.
        Lower the heat to medium. Add some mung beans, bean sprouts, and cover with a lid for about 3 minutes, or until bean sprouts are slightly cooked. The batter should also be slightly cooked and transparent around the edges. This step cooks the top side of the ingredients and batter while it steams since we wont be flipping the crepe.

        Remove the lid, lower heat to medium-low and wait for the crêpe to become crisp. This takes about 5-7 minutes. This step lets the ingredients fully cook through, including the batter. It also lets steam escape so the batter can crisp up. Brush on a little oil around the edges if youre not seeing or hearing enough batter to pan contact. Fold in half, transfer to a plate and serve immediately. For batter troubleshooting please see the troubleshooting section in the post above.',

        'BATTER
        - 255 g (1 3/4 c) rice flour
        - 85 g (0.7 c) all-purpose flour
        - 2-3 tsp turmeric
        - 28 fl oz (3.5 c) water
        - 14 fl oz (396.9 ml) coconut cream if unavailable, use coconut milk
        - 1 tsp salt
        - 1 sprig green onion chopped about 1/2" long

        FILLING
        - 1 lb (453 g) shrimp, headless size 45/50 or 60/70
        - 1.5 lb (680.39 g) pork belly
        - 1 medium yellow onion thinly sliced
        - 1.5 lb (680.39 g) bean sprouts
        - 1/2 c dry mung beans optional

        VEGETABLES
        - 1 head mustard greens caỉ xanh
        - 1 bunch mint
        - 1 bunch cilantro
        - 1 bunch Vietnamese perilla (tía tô) optional
        DIPPING SAUCE
        - Vietnamese prepared dipping sauce
        ', 
        'Source: HUNGRY HUY',
        './link3.html');

        CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            name VARCHAR(200),
            rating INTEGER,
            comment TEXT,
            recipe_id INTEGER REFERENCES recipes(recipe_id)
            );

        INSERT INTO comments (name, rating, comment, recipe_id)
        VALUES ('Amy', 4, 'great', 1),
        ('Danny', 4, 'it looks delicious', 1), ('Mary', 3, 'hard to find ingredients', 1), ('Tom', 5, 'love it', 1), ('Christopher', 5, 'I tried to make it before. It is delicious, the crepe is crispy and the sauce is good too. Highly recommend!', 3), ('Tony',5, 'I would try to make it this weekend. Tried it before at the restaurant and it is so delicious',2 ), ('Tammy', 5, 'Love!love!love! Pho is so delicious. Thanks for the recipe!', 1), ('May', 4, 'It look so delicious but I am not a fan of vegetables', 3), ('Alton', 5, 'Tried it before and love it. Thanks for the recipe, now I can try to make it at home to enjoy with my family', 2); 
        
        `)
        .then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))
    }
}