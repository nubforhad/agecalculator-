/**
 * ProfilesEngine - Manages saved birthdays and family profiles in LocalStorage
 */
class ProfilesEngine {
    static STORAGE_KEY = 'antigraph_age_profiles_v1';

    static getDefaultProfiles() {
        return [
            { id: 'sample-1', name: 'Albert Einstein', date: '1879-03-14', time: '11:30', note: 'Theoretical Physicist' },
            { id: 'sample-2', name: 'Marie Curie', date: '1867-11-07', time: '09:00', note: 'Nobel Laureate' },
            { id: 'sample-3', name: 'Ada Lovelace', date: '1815-12-10', time: '14:15', note: 'First Computer Programmer' }
        ];
    }

    static getProfiles() {
        try {
            const raw = localStorage.getItem(ProfilesEngine.STORAGE_KEY);
            if (!raw) {
                const defaults = ProfilesEngine.getDefaultProfiles();
                ProfilesEngine.saveProfiles(defaults);
                return defaults;
            }
            return JSON.parse(raw);
        } catch (e) {
            console.error("Failed to read profiles from localStorage:", e);
            return ProfilesEngine.getDefaultProfiles();
        }
    }

    static saveProfiles(profiles) {
        try {
            localStorage.setItem(ProfilesEngine.STORAGE_KEY, JSON.stringify(profiles));
        } catch (e) {
            console.error("Failed to save profiles to localStorage:", e);
        }
    }

    static addProfile(name, date, time = '00:00', note = '') {
        const profiles = ProfilesEngine.getProfiles();
        const newProfile = {
            id: 'prof_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            name: name.trim() || 'Untitled Profile',
            date,
            time: time || '00:00',
            note: note.trim()
        };
        profiles.unshift(newProfile);
        ProfilesEngine.saveProfiles(profiles);
        return newProfile;
    }

    static deleteProfile(id) {
        let profiles = ProfilesEngine.getProfiles();
        profiles = profiles.filter(p => p.id !== id);
        ProfilesEngine.saveProfiles(profiles);
        return profiles;
    }

    static exportJson() {
        const profiles = ProfilesEngine.getProfiles();
        return JSON.stringify(profiles, null, 2);
    }

    static importJson(jsonStr) {
        try {
            const parsed = JSON.parse(jsonStr);
            if (Array.isArray(parsed)) {
                ProfilesEngine.saveProfiles(parsed);
                return true;
            }
        } catch (e) {
            console.error("Invalid JSON import:", e);
        }
        return false;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfilesEngine;
}
