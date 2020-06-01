<?php

namespace App\DataFixtures;

use App\Entity\Annonce;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * L'encodeur de mots de passe
     *
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for($u = 0; $u < 30; $u++ ) {
            $user = new User();

            $hash = $this->encoder->encodePassword($user, "password");

            $user->setFirstName($faker->firstName())
                ->setLastName($faker->lastName)
                ->setEmail($faker->email)
                ->setNumber($faker->e164PhoneNumber)
                ->setExigences($faker->paragraphs(2, true))
                ->setPassword($hash);

            $manager->persist($user);

            for($a = 0; $a < mt_rand(3, 10); $a++)
            {
                $annonce = new Annonce();
                $annonce->setCreated($faker->dateTimeBetween('-9 months'))
                        ->setClasse($faker->randomElement(['6 éme', '5 éme', '4 éme', '3 éme', '2 nde', '1 er', 'Tle']))
                        ->setVille($faker->randomElement(['Deido', 'Bonamoussadi', 'Bonapriso', 'Logbessou', 'Bonanjo', 'Kotto', 'Bonaberi']))
                        ->setTitre($faker->randomElement(['CIAM', 'Excellence', 'NATHAN', 'Sciences de la vie et de la terre', 'Champions', 'Chemin de la réussite', 'Histoire', 'Géographie', 'CARGO', 'Physique', 'Chimie']))
                        ->setEditeur($faker->randomElement(['Les Classiques Africains', 'EDICEF', 'HATIER', 'Editions Clé', 'Professeurs réunis']))
                        ->setDescription($faker->paragraphs(1, true))
                        ->setParution($faker->year)
                        ->setUser($user);

                $manager->persist($annonce);
            }
        }
        $manager->flush();
    }

}