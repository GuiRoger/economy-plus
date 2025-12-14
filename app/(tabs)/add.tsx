import { addTransaction } from "@/backend/storage/transactions.repo";
import { brlToCents } from "@/utils/money";
import { TransactionForm, transactionFormSchema } from "@/validation/transactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Crypto from "expo-crypto";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Chip, HelperText, SegmentedButtons, Text, TextInput } from "react-native-paper";

export function AddTransactionScreen() {
  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Travel', 'Education'];

  const [type, setType] = React.useState<"expense" | "income">("expense");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TransactionForm>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: { amountText: "", description: "", category: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: TransactionForm) => {
    console.log("SUBMIT OK =>", data);

    const amountCents = brlToCents(data.amountText);



    addTransaction({
      id: Crypto.randomUUID(),
      type, // ✅ respeita expense/income
      amountCents,
      description: data.description,
      category: data.category, // ✅ agora vem preenchido
      dateISO: new Date().toISOString(),
    });

    reset();
    setSelectedCategory(null);

  };

  const onInvalid = (formErrors: any) => {
    console.log("FORM INVÁLIDO =>", formErrors);
  };

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <SegmentedButtons
        value={type}
        onValueChange={(v) => setType(v as any)}
        buttons={[
          { value: "expense", label: "Expense" },
          { value: "income", label: "Income" },
        ]}
      />

      <View>
        <Controller
          control={control}
          name="amountText"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Amount"
                mode="outlined"
                keyboardType="numeric"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.amountText}
                left={<TextInput.Affix text="R$" />}
              />
              <HelperText type="error" visible={!!errors.amountText}>
                {errors.amountText?.message}
              </HelperText>
            </>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Description"
                mode="outlined"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.description}
              />
              <HelperText type="error" visible={!!errors.description}>
                {errors.description?.message}
              </HelperText>
            </>
          )}
        />
      </View>

      <View style={{ flexDirection: "column", gap: 8 }}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>Category</Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {categories.map((cat) => {
            const selected = selectedCategory === cat;
            return (
              <Chip
                key={cat}
                icon="plus"
                onPress={async () => {
                  const next = selected ? "" : cat;

                  setSelectedCategory(selected ? null : cat);

                  // ✅ aqui é o ponto principal: atualizar o campo do FORM
                  setValue("category", next, { shouldValidate: true, shouldDirty: true });
                  await trigger("category"); // força validar e atualizar errors
                }}
                mode="outlined"
                style={{ width: "auto", backgroundColor: selected ? "#19e65d" : "#29382e" }}
                textStyle={{ color: selected ? "black" : "white" }}
                showSelectedCheck
              >
                {cat}
              </Chip>
            );
          })}
        </View>

        <HelperText type="error" visible={!!errors.category}>
          {errors.category?.message}
        </HelperText>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit, onInvalid)}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Add
      </Button>
    </View>
  );
}
