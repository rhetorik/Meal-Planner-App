<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import MealCard from "../components/MealCard.svelte";

    let { id } = $props();

    let profile = $state(null);

    onMount(async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const response = await axios.get(`http://localhost:8080/users/${id}`, {
                headers: {
                    Authorization: user.header_token
                }
            });

            profile = response.data;
        } catch (error) {
            console.log(error);
        }
    });
</script>

<div class="profile-container">
    {#if !profile}
        <div>Loading User Profile...</div>
    {:else}
        <h1>Welcome, {profile.username}</h1>
        <hr />
        <h2>Preferences</h2>
        {#if profile.preferences.length === 0}
            <p>No Dietary Preferences</p>
        {:else}
            <p>{profile.preferences}</p>
        {/if}
        <h2>Meal Plan</h2>
        {#if profile.user_mealplans.length === 0}
            <p>No Meal Plans</p>
        {:else}
            {#each profile.user_mealplans as mealplan}
                <div class="meal-list">
                    <p>Week {mealplan.week}</p>
                    <MealCard 
                        meals={mealplan.meals}
                    />
                </div>
            {/each}
        {/if}
        
    {/if}
</div>

<style>

    .profile-container {
        margin: 2rem auto;
        padding: 2rem;
        text-align: left;
    }

    h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 2rem;
    }

    h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5rem;
    }

    .meal-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }
</style>