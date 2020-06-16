<?php

namespace App\Entity;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\AnnonceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(normalizationContext={
 *          "groups"={"annonce_read"}
 *     })
 * @ORM\Entity(repositoryClass=AnnonceRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"ville", "classe", "titre", "editeur", "created"})
 * @ApiFilter(OrderFilter::class, properties={"created"})
 *
 */
class Annonce
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"annonce_read", "user_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonce_read", "user_read"})
     * @Assert\Length(min="4", max="30", minMessage="Le nom du quartier doit faire au moins 4 caractéres", maxMessage="Le nom du quartier doit faire maximun 30 caractéres")
     * @Assert\NotBlank(message="Le quartier est obligatoire")
     */
    private $ville;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonce_read", "user_read"})
     */
    private $classe;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonce_read", "user_read"})
     * @Assert\Length(min="3", max="25", minMessage="Le titre du livre doit faire au moins 3 caractéres", maxMessage="Le titre du livre doit faire maximun 25 caractéres")
     * @Assert\NotBlank(message="Le titre est obligatoire")
     */
    private $titre;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonce_read", "user_read"})
     * @Assert\Length(min="3", max="25", minMessage="Le nom de la maison d'edition doit faire au moins 3 caractéres", maxMessage="Le nom de la maison d'edition doit faire maximun 25 caractéres")
     * @Assert\NotBlank(message="La maison d'édition est obligatoire")
     */
    private $editeur;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"annonce_read", "user_read"})
     * @Assert\Type(type="numeric", message="La date de parution doit etre des chiffres !")
     * @Assert\NotBlank(message="L'année de parution est obligatoire")
     */
    private $parution;

    /**
     * @ORM\Column(type="text")
     * @Groups({"annonce_read", "user_read"})
     * @Assert\Length(min="10", max="2000", minMessage="La description du livre doit faire au moins 10 caractéres", maxMessage="La description du livre doit faire maximun 2000 caractéres (environ 200 mots)")
     * @Assert\NotBlank(message="La description du livre est obligatoire")
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"annonce_read", "user_read"})
     * @Assert\Type("\DateTimeInterface")
     * @Assert\NotBlank(message="La date d'envoie doit etre renseigné")
     */
    private $created;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="annonces")
     * @Groups({"annonce_read"})
     * @Assert\NotBlank(message="L'utilisateur est obligatoire")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): self
    {
        $this->ville = $ville;

        return $this;
    }

    public function getClasse(): ?string
    {
        return $this->classe;
    }

    public function setClasse(string $classe): self
    {
        $this->classe = $classe;

        return $this;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }

    public function getEditeur(): ?string
    {
        return $this->editeur;
    }

    public function setEditeur(string $editeur): self
    {
        $this->editeur = $editeur;

        return $this;
    }

    public function getParution(): ?int
    {
        return $this->parution;
    }

    public function setParution(int $parution): self
    {
        $this->parution = $parution;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
