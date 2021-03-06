import {
    Box,
    Button,
    Flex,
    List,
    ListItem,
    Text,
} from '@chakra-ui/react';
import React from 'react';

const TodoTask = ({
    arrayTask,
    handleCompleted,
    handleDelete,
    handleShowCompleted,
    handleShowActive,
    showAllTasks,
    showCompletedTasks,
    completedArrayTasks,
    showActiveTasks,
    handleShowAll,
    activeArrayTasks,
    handleRemoveAll
}) => {
    return (
        <>
            <List marginLeft={"15%"} w='100%'>
                {showAllTasks ? (
                    arrayTask?.map((elem) => (
                        <ListItem key={elem.id} fontSize={'2em'}>
                            <Flex w="70%" p={2} align="center"
                                bg="secondary.300">
                                <Text
                                    onClick={() => handleCompleted(elem.id)}
                                    w="100%"
                                    style={{
                                        textDecoration: elem.completed
                                            ? 'line-through'
                                            : 'none',
                                    }}
                                    id={elem.id}
                                >
                                    {elem.name}
                                </Text>
                                <Button
                                    bg={"white"}
                                    onClick={() => handleDelete(elem.id)}>
                                    Delete
                                </Button>

                            </Flex>
                        </ListItem>
                    ))

                ) : null
                }
                {showCompletedTasks ? (
                    completedArrayTasks?.map((elem) => (
                        <ListItem key={elem.id} fontSize={'2em'}>
                            <Flex w="70%" p={2} align="center"
                                bg="secondary.300">
                                <Text
                                    onClick={() => handleCompleted(elem.id)}
                                    w="100%"
                                    style={{
                                        textDecoration: elem.completed
                                            ? 'line-through'
                                            : 'none',
                                    }}
                                    id={elem.id}
                                >
                                    {elem.name}
                                </Text>
                                <Button
                                    bg={"white"}
                                    onClick={() => handleDelete(elem.id)}>
                                    Delete
                                </Button>
                            </Flex>
                        </ListItem>
                    ))
                ) : null
                }
                {showActiveTasks ? (
                    activeArrayTasks?.map((elem) => (
                        <ListItem key={elem.id} fontSize={'2em'}>
                            <Flex w="70%" p={2} align="center"
                                bg="secondary.300">
                                <Text
                                    onClick={() => handleCompleted(elem.id)}
                                    w="100%"
                                    id={elem.id}
                                >
                                    {elem.name}
                                </Text>
                                <Button
                                    bg={"white"}
                                    onClick={() => handleDelete(elem.id)}>
                                    Delete
                                </Button>
                            </Flex>
                        </ListItem>
                    ))
                ) : null
                }
                <Box flex="0.5" p="undefined" bg="gray" w="70%">
                    <Flex direction="column">
                        <Flex justify="space-between" w="100%" p={3} align="center">
                            <Button
                            onClick={handleShowAll}
                                _hover={{
                                    bg: 'secondary.500',
                                    color: 'black.500',
                                }}
                                style={{
                                    backgroundColor: showAllTasks
                                        ? '#6565eb'
                                        : 'gray',
                                }}
                                color="secondary.500"
                                bg="gray"
                                id="all"
                            >
                                All
                            </Button>
                            <Button
                                onClick={handleShowCompleted}
                                _hover={{
                                    bg: 'secondary.500',
                                    color: 'black.500',
                                }}
                                style={{
                                    backgroundColor: showCompletedTasks
                                        ? '#6565eb'
                                        : 'gray',
                                }}
                                color="secondary.500"
                                bg="gray"
                                id="completed"
                            >
                                Completed
                            </Button>
                            <Button
                                onClick={handleShowActive}
                                _hover={{
                                    bg: 'secondary.500',
                                    color: 'black.500',
                                }}
                                style={{
                                    backgroundColor: showActiveTasks
                                        ? '#6565eb'
                                        : 'gray',
                                }}
                                color="secondary.500"
                                bg="gray"
                                id="active"
                            >
                                Active
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
                <Box flex="0.5" p="undefined" bg="primary.500" w="70%">
                        <Flex  w="100%" p={2} justifyContent={'center'}>
                            <Button
                                onClick={handleRemoveAll}
                                _hover={{
                                    bg: 'gray',
                                    color: 'black.500',
                                }}
                                flex="0.5" p="undefined" bg="gray" w="70%"
                                color="secondary.500"
                                id="removeAll"
                            >
                                Remove all
                            </Button>
                        </Flex>
                </Box>
            </List>
        </>

    );
};

export default TodoTask;
