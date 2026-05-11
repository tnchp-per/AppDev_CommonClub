import styles from "@/components/LogInStyles";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth(); // ดึงฟังก์ชัน login มาจาก Context

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            await login(email, password);
            // เมื่อสำเร็จ ปกติ Context จะเปลี่ยนสถานะ user และนำทางไปหน้าหลักอัตโนมัติ
        } catch (error: any) {
            alert(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Logo / Illustration Area */}
                <View style={styles.headerArea}>
                    <Image source={require("../assets/images/logo_transparent.png")}
                        style={{
                            width: 100,
                            height: 100,
                            alignSelf: "center",
                            marginBottom: 5,
                        }}
                    />
                    <Text style={styles.welcomeText}>WELCOME TO</Text>
                    <Text style={styles.welcomeText}>COMMON CLUB</Text>
                    <Text style={styles.subText}>Login to join our community</Text>
                </View>

                {/* Form Area */}
                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>EMAIL</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="example@mail.com"
                            placeholderTextColor="#A0A0A0"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>PASSWORD</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#A0A0A0"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FAF9F1" />
                        ) : (
                            <Text style={styles.loginButtonText}>LOGIN</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text style={styles.signupText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}