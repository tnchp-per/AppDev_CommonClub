import styles from "@/components/LogInStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Image, KeyboardAvoidingView, Platform, ScrollView,
    Text, TextInput, TouchableOpacity,
    View
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function SignUp() {
    const router = useRouter();
    const { signUp } = useAuth();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name || !username || !email || !password) {
            alert("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await signUp(name, username, email, password);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: 40 }, { paddingTop: 40 }
                ]}
            >
                {/* --- 1. ส่วน Header (Logo และ Text) --- */}
                <View style={styles.headerArea}>
                    <Image
                        source={require("../../assets/images/logo_transparent.png")}
                        style={{ width: 80, height: 80, alignSelf: "center", marginBottom: 5, marginTop: 20 }}
                    />
                    <Text style={styles.welcomeText}>CREATE ACCOUNT</Text>
                    <Text style={styles.subText}>Join Common Club today</Text>
                </View>

                {/* --- 2. ส่วน Form Inputs --- */}
                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>FULL NAME</Text>
                        <TextInput style={styles.input} placeholder="John Doe" value={name} onChangeText={setName} />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>USERNAME</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="your_username"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>EMAIL</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="example@mail.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>PASSWORD</Text>
                        <TextInput style={styles.input} placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
                        <TextInput style={styles.input} placeholder="••••••••" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
                    </View>

                    {/* --- 3. ปุ่มกด --- */}
                    <TouchableOpacity style={styles.loginButton} onPress={handleSignUp} disabled={loading}>
                        {loading ? <ActivityIndicator color="#FAF9F1" /> : <Text style={styles.loginButtonText}>SIGN UP</Text>}
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                            <Text style={styles.signupText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}