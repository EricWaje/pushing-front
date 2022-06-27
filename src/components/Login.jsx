import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
} from '@chakra-ui/react';
import { UserContext } from '../context/userContext';
import { DAY, GENDER, MONTH, YEAR } from '../constants/constants';
import usePost from '../customHook/usePost';

const initialState = {
    user: '',
    pass: '',
    gender: '',
    day: '',
    month: '',
    year: '',
};
const Login = () => {
    const [info, setInfo] = useState(initialState);
    const [toggleForm, setToggleForm] = useState(true);
    const { execute, loading, error } = usePost();
    const { token } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value,
        });
    };

    const handleChangeRadio = (e) => {
        setInfo({
            ...info,
            gender: e,
        });
    };

    var errors = {};
    const handleUserValidation = () => {

        let formIsValid = true;

        if (typeof info.user !== "undefined") {
            if (!info.user.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors = "Username cannot have numbers or special characters";
                return formIsValid
            }
        }
        return formIsValid
    }

    const handlePasswordValidation = () => {

        let formIsValid = true;

        if (typeof info.pass !== "undefined") {
            if (!info.pass.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/)) {
                formIsValid = false;
                errors = "Password must have a special character and a number";
                return formIsValid
            }
                if (!info.pass.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
                    formIsValid = false;
                    errors = "Password must have between 6 and 16 characters";
                    return formIsValid
            }
        }
        return formIsValid
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleUserValidation() && handlePasswordValidation()) {
            if (toggleForm) {
                //peticion registro
                execute({
                    endpoint: 'register',
                    postData: {
                        username: info.user,
                        password: info.pass,
                        gender: info.gender,
                        day: info.day,
                        month: info.month,
                        year: info.year,
                    },
                });
            } else {
                //petición login
                execute({
                    endpoint: 'login',
                    postData: {
                        username: info.user,
                        password: info.pass,
                    },
                });
            }
        } else {
            document.getElementById("errorMessage").innerHTML = errors
        }
    };

    if (token) {
        return <Navigate to="/home" replace={true} />;
    }

    return (
        <Flex minH="100vh" justify="center" align="center" direction="column">
            <Heading color="black.500" mb={3}>
                Pushing IT
            </Heading>
            {loading ? (
                <h2>Cargando...</h2>
            ) : (
                <>
                    <Flex
                        bg="primary.500"
                        borderRadius={5}
                        p={5}
                        mb={10}
                        direction="column"
                        boxShadow="5px 5px 1px 1px #88f6f6, -1px -1px 10px 1px #88f6f6"
                        minW="35%"
                    >
                        <form onSubmit={handleSubmit}>
                            <FormControl isRequired mb={5}>
                                <FormLabel htmlFor="user" color="white">
                                    User
                                </FormLabel>
                                <Input
                                    name="user"
                                    cy-get="user"
                                    id="user"
                                    type="text"
                                    color="white"
                                    bg="primary.300"
                                    value={info.user}
                                    focusBorderColor="none"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl isRequired mb={5}>
                                <FormLabel htmlFor="pass" color="white">
                                    Password
                                </FormLabel>
                                <Input
                                    name="pass"
                                    value={info.pass}
                                    id="pass"
                                    type="password"
                                    color="white"
                                    bg="primary.300"
                                    focusBorderColor="none"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {toggleForm ? (
                                <>
                                    <FormControl
                                        as="fieldset"
                                        isRequired
                                        mb={5}
                                    >
                                        <FormLabel color="white" as="legend">
                                            Gender
                                        </FormLabel>
                                        <RadioGroup
                                            defaultValue="Male"
                                            onChange={handleChangeRadio}
                                            value={info.gender}
                                        >
                                            <HStack spacing="24px">
                                                {GENDER.map((elem, idx) => (
                                                    <Radio
                                                        key={idx}
                                                        value={elem}
                                                    >
                                                        {elem}
                                                    </Radio>
                                                ))}
                                            </HStack>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl isRequired mb={5}>
                                        <FormLabel htmlFor="day" color="white">
                                            Day of birth
                                        </FormLabel>
                                        <Select
                                            id="day"
                                            bg="primary.300"
                                            color="black.500"
                                            focusBorderColor="none"
                                            onChange={handleChange}
                                            name="day"
                                        >
                                            {DAY.map((elem, idx) => (
                                                <option
                                                    value={elem}
                                                    key={idx}>
                                                    {elem}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl isRequired mb={5}>
                                        <FormLabel
                                            htmlFor="month"
                                            color="white"
                                        >
                                            Month
                                        </FormLabel>
                                        <Select
                                            id="month"
                                            bg="primary.300"
                                            color="black.500"
                                            focusBorderColor="none"
                                            name="month"
                                            onChange={handleChange}
                                        >
                                            {MONTH.map((elem, idx) => (
                                                <option
                                                    value={idx}
                                                    key={idx}>
                                                    {elem}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl isRequired mb={5}>
                                        <FormLabel htmlFor="year" color="white">
                                            Year
                                        </FormLabel>
                                        <Select
                                            id="year"
                                            bg="primary.300"
                                            color="black.500"
                                            focusBorderColor="none"
                                            onChange={handleChange}
                                            name="year"
                                        >
                                            {YEAR.map((elem, idx) => (
                                                <option
                                                    value={elem}
                                                    key={idx}>
                                                    {elem}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </>
                            ) : null}
                            <Text
                                id="errorMessage"
                                color={"red"}
                            >

                            </Text>
                            <Button
                                mt={4}
                                color="white"
                                bg="black.500"
                                type="submit"
                                _hover={{
                                    bg: 'secondary.300',
                                    color: 'black.500',
                                }}
                            >
                                {toggleForm ? 'Registrate' : 'Iniciar sesión'}
                            </Button>
                            <Text mt={4}>
                                {toggleForm
                                    ? 'Si ya estás registrado '
                                    : 'Aún no tenés cuenta? '}
                                <Text
                                    as="span"
                                    color="white"
                                    cursor="pointer"
                                    onClick={() => setToggleForm(!toggleForm)}
                                >
                                    {toggleForm
                                        ? 'Iniciá sesión'
                                        : 'Registrate'}
                                </Text>
                            </Text>
                        </form>
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default Login;
