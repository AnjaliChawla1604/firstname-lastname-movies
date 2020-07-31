import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import { useValue } from 'react-native-redash';

import Modal from '@components/Modal';
import Movie from '@components/Movie';

import type MovieType from '@app/types/Movie';
import type PositionType from '@app/types/Position';

interface ModalState {
    movie: MovieType;
    position: PositionType;
}

type StartParamList = {
    Start: {
        movies: Array<MovieType>;
    };
};

type StartRoute = RouteProp<StartParamList, 'Start'>;

const Start = () => {
    const route = useRoute<StartRoute>();
    const { movies } = route.params;
    const activeMovieId = useValue<number>(-1);
    const [modal, setModal] = useState<ModalState | null>(null);

    const open = (index: number, movie: MovieType, position: PositionType) => {
        activeMovieId.setValue(index);
        setModal({ movie, position });
    };

    const close = () => {
        activeMovieId.setValue(-1);
        setModal(null);
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                
                <FlatList
                    data={movies}
                    renderItem={({ item, index }) =>
                        <Movie
                            activeMovieId={activeMovieId}
                            key={item.name}
                            index={index}
                            movie={item}
                            open={open}
                        />
                    }
                    keyExtractor={item => item.name}
                    >

                </FlatList>

                {/* <ScrollView contentInsetAdjustmentBehavior="automatic">
                    {movies.map((movie, index) => (
                        <Movie
                            activeMovieId={activeMovieId}
                            key={movie.name}
                            index={index}
                            movie={movie}
                            open={open}
                        />
                    ))}
                </ScrollView> */}
                {modal !== null && <Modal {...modal} close={close} />}
            </SafeAreaView>
        </>
    );
};

export default Start;
