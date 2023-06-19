import {
  Box,
  FormControl,
  FormLabel,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";

const PokemonModal = memo((props) => {
  const { isOpen, onClose, pokemon } = props;

  const [name, setName] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");

  useEffect(() => {
    if (pokemon) {
      setName(pokemon.name);
      if (pokemon.sprites && pokemon.sprites.front_default) {
        setFrontImage(pokemon.sprites.front_default);
      }
      setWeight(pokemon.weight);
      setHeight(pokemon.height);
    }
  }, [pokemon]);

  console.log(pokemon);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalHeader>ポケモン詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody m={4}>
          <Stack spacing={4}>
            <Image src={frontImage} />
            {/* <Image src={backImage} /> */}
            <FormControl>
              <FormLabel>名前</FormLabel>
              <p>{name}</p>
            </FormControl>

            <FormControl>
              <FormLabel>タイプ</FormLabel>
              {/* {pokemon.types.map((type) => {
                return (
                  <div key={type.type.name}>
                    <span className="typeName">{type.type.name}</span>
                  </div>
                );
              })} */}
            </FormControl>
            <div className="cardInfo">
              <div className="cardData">
                <p className="title">重さ:{weight}</p>
              </div>
              <div className="cardData">
                <p className="title">高さ:{height}</p>
              </div>
              <div className="cardData">
                <p className="title">アビリティ:</p>
              </div>
            </div>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default PokemonModal;
