<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(normalizationContext={
 *          "groups"={"user_read"}
 *     })
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository", repositoryClass=UserRepository::class)
 * @UniqueEntity("email", message="cet utilisateur ayant cette adresse email existe déja")
 *
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user_read", "annonce_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user_read", "annonce_read"})
     * @Assert\Email(message="Le format de l'adresse email doit etre valide !")
     * @Assert\NotBlank(message="L'email doit etre renseigné")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"user_read", "annonce_read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Groups({"user_read"})
     * @Assert\NotBlank(message="Le mot de passe est obligatoire")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read", "annonce_read"})
     * @Assert\Length(min="3", max="25", minMessage="Le prénom doit faire au moins 3 caractéres", maxMessage="Le prénom doit faire maximun 25 caractéres")
     * @Assert\NotBlank(message="Le prénom est obligatoire")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read", "annonce_read"})
     * @Assert\Length(min="3", max="25", minMessage="Le nom doit faire au moins 3 caractéres", maxMessage="Le nom doit faire maximun 25 caractéres")
     * @Assert\NotBlank(message="Le nom est obligatoire")
     */
    private $lastName;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"user_read", "annonce_read"})
     * @Assert\Type(type="numeric", message="Le numéro doit etre des chiffres !")
     * @Assert\NotBlank(message="Le numéro est obligatoire")
     */
    private $number;

    /**
     * @ORM\OneToMany(targetEntity=Annonce::class, mappedBy="user")
     * @Groups({"user_read"})
     */
    private $annonces;

    /**
     * @ORM\Column(type="text")
     * @Groups({"user_read", "annonce_read"})
     * @Assert\Length(min="15", max="4000", minMessage="Les conditions pour le troc d'un ou plusieur livre(s) est obligatoire, elle doit faire au moins 15 caractéres", maxMessage="Les conditions pour le troc d'un ou plusieur livre(s) est obligatoire, elle doit faire au max 4000 caractéres")
     * @Assert\NotBlank(message="Les conditions pour le troc d'un ou plusieur livre(s) est obligatoire")
     */
    private $exigences;

    public function __construct()
    {
        $this->annonces = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getNumber(): ?int
    {
        return $this->number;
    }

    public function setNumber(int $number): self
    {
        $this->number = $number;

        return $this;
    }

    /**
     * @return Collection|Annonce[]
     */
    public function getAnnonces(): Collection
    {
        return $this->annonces;
    }

    public function addAnnonce(Annonce $annonce): self
    {
        if (!$this->annonces->contains($annonce)) {
            $this->annonces[] = $annonce;
            $annonce->setUser($this);
        }

        return $this;
    }

    public function removeAnnonce(Annonce $annonce): self
    {
        if ($this->annonces->contains($annonce)) {
            $this->annonces->removeElement($annonce);
            // set the owning side to null (unless already changed)
            if ($annonce->getUser() === $this) {
                $annonce->setUser(null);
            }
        }

        return $this;
    }

    public function getExigences(): ?string
    {
        return $this->exigences;
    }

    public function setExigences(string $exigences): self
    {
        $this->exigences = $exigences;

        return $this;
    }
}
