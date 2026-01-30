import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Louvor Seráfico</Text>
            <Text style={styles.subtitle}>Para honra e glória de Deus!</Text>
            <Link href="/details" asChild>
                <Text style={styles.link}>Ver detalhes (Exemplo)</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#38434D',
        marginTop: 8,
    },
    link: {
        marginTop: 16,
        color: 'blue',
    },
});
